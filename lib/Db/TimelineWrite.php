<?php
declare(strict_types=1);

namespace OCA\Memories\Db;

use OCA\Memories\AppInfo\Application;
use OCA\Memories\Exif;
use OCP\Files\File;
use OCP\IDBConnection;
use OCP\DB\QueryBuilder\IQueryBuilder;

class TimelineWrite {
    protected IDBConnection $connection;

    public function __construct(IDBConnection $connection) {
        $this->connection = $connection;
    }

    /**
     * Check if a file has a valid mimetype for processing
     * @param File $file
     * @return int 0 for invalid, 1 for image, 2 for video
     */
    public function getFileType(File $file): int {
        $mime = $file->getMimeType();
        if (in_array($mime, Application::IMAGE_MIMES)) {
            return 1;
        } elseif (in_array($mime, Application::VIDEO_MIMES)) {
            return 2;
        }
        return 0;
    }

    /**
     * Process a file to insert Exif data into the database
     * @param File $file
     * @return int 2 if processed, 1 if skipped, 0 if not valid
     */
    public function processFile(
        File &$file,
        bool $force=false
    ): int {
        // There is no easy way to UPSERT in a standard SQL way, so just
        // do multiple calls. The worst that can happen is more updates,
        // but that's not a big deal.
        // https://stackoverflow.com/questions/15252213/sql-standard-upsert-call

        // Check if we want to process this file
        $fileType = $this->getFileType($file);
        $isvideo = ($fileType === 2);
        if (!$fileType) {
            return 0;
        }

        // Get parameters
        $mtime = $file->getMtime();
        $fileId = $file->getId();

        // Check if need to update
        $query = $this->connection->getQueryBuilder();
        $query->select('fileid', 'mtime')
            ->from('memories')
            ->where($query->expr()->eq('fileid', $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)));
        $cursor = $query->executeQuery();
        $prevRow = $cursor->fetch();
        $cursor->closeCursor();
        if ($prevRow && !$force && intval($prevRow['mtime']) === $mtime) {
            return 1;
        }

        // Get exif data
        $exif = [];
        try {
            $exif = Exif::getExifFromFile($file);
        } catch (\Exception $e) {}

        // Get more parameters
        $dateTaken = Exif::getDateTaken($file, $exif);
        $dayId = floor($dateTaken / 86400);
        $dateTaken = gmdate('Y-m-d H:i:s', $dateTaken);

        if ($prevRow) {
            // Update existing row
            $query->update('memories')
                ->set('dayid', $query->createNamedParameter($dayId, IQueryBuilder::PARAM_INT))
                ->set('datetaken', $query->createNamedParameter($dateTaken, IQueryBuilder::PARAM_STR))
                ->set('mtime', $query->createNamedParameter($mtime, IQueryBuilder::PARAM_INT))
                ->set('isvideo', $query->createNamedParameter($isvideo, IQueryBuilder::PARAM_INT))
                ->where($query->expr()->eq('fileid', $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)));
            $query->executeStatement();
        } else {
            // Try to create new row
            try {
                $query->insert('memories')
                    ->values([
                        'fileid' => $query->createNamedParameter($fileId, IQueryBuilder::PARAM_INT),
                        'dayid' => $query->createNamedParameter($dayId, IQueryBuilder::PARAM_INT),
                        'datetaken' => $query->createNamedParameter($dateTaken, IQueryBuilder::PARAM_STR),
                        'mtime' => $query->createNamedParameter($mtime, IQueryBuilder::PARAM_INT),
                        'isvideo' => $query->createNamedParameter($isvideo, IQueryBuilder::PARAM_INT),
                    ]);
                $query->executeStatement();
            } catch (\Exception $ex) {
                error_log("Failed to create memories record: " . $ex->getMessage());
            }
        }

        return 2;
    }

    /**
     * Remove a file from the exif database
     * @param File $file
     */
    public function deleteFile(File &$file) {
        $query = $this->connection->getQueryBuilder();
        $query->delete('memories')
            ->where($query->expr()->eq('fileid', $query->createNamedParameter($file->getId(), IQueryBuilder::PARAM_INT)));
        $query->executeStatement();
    }

    /**
     * Clear the entire index. Does not need confirmation!
     * @param File $file
     */
    public function clear() {
        $query = $this->connection->getQueryBuilder();
        $query->delete('memories');
        $query->executeStatement();
    }
}