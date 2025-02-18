<template>
    <div class="folder" v-bind:class="{
        hasPreview: previewFileInfos.length > 0,
        onePreview: previewFileInfos.length === 1,
        hasError: error,
    }"
        @click="openFolder(data)"
        v-bind:style="{
            width: rowHeight + 'px',
            height: rowHeight + 'px',
        }">
        <div class="big-icon">
            <FolderIcon class="memories__big-folder-icon" />
            <div class="name">{{ data.name }}</div>
        </div>

        <div class="previews">
            <div class="img-outer" v-for="info of previewFileInfos" :key="info.fileid">
                <img
                    :key="'fpreview-' + info.fileid"
                    :src="getPreviewUrl(info.fileid, info.etag)"
                    :class="{
                        'p-loading': !(info.flag & c.FLAG_LOADED),
                        'p-load-fail': info.flag & c.FLAG_LOAD_FAIL,
                    }"
                    @load="info.flag |= c.FLAG_LOADED"
                    @error="info.flag |= c.FLAG_LOAD_FAIL" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { IFileInfo, IFolder } from '../../types';
import GlobalMixin from '../../mixins/GlobalMixin';

import * as dav from "../../services/DavRequests";
import { getPreviewUrl } from "../../services/FileUtils";

import FolderIcon from 'vue-material-design-icons/Folder.vue';

@Component({
    components: {
        FolderIcon,
    },
})
export default class Folder extends Mixins(GlobalMixin) {
    @Prop() data: IFolder;
    @Prop() rowHeight: number;

    // Separate property because the one on data isn't reactive
    private previewFileInfos: IFileInfo[] = [];

    // Error occured fetching thumbs
    private error = false;

    /** Passthrough */
    private getPreviewUrl = getPreviewUrl;

    mounted() {
        this.refreshPreviews();
    }

    @Watch('data')
    dataChanged() {
        this.refreshPreviews();
    }

    /** Refresh previews */
    refreshPreviews() {
        // Reset state
        this.error = false;

        // Check if valid path present
        if (!this.data.path) {
            this.error = true;
            return;
        }

        // Get preview infos
        if (!this.data.previewFileInfos) {
            const folderPath = this.data.path.split('/').slice(3).join('/');
            dav.getFolderPreviewFileIds(folderPath, 4).then(fileInfos => {
                fileInfos = fileInfos.filter(f => f.hasPreview);
                fileInfos.forEach(f => f.flag = 0);
                if (fileInfos.length > 0 && fileInfos.length < 4) {
                    fileInfos = [fileInfos[0]];
                }
                this.data.previewFileInfos = fileInfos;
                this.previewFileInfos = fileInfos;
            }).catch(() => {
                this.data.previewFileInfos = [];
                this.previewFileInfos = [];

                // Something is wrong with the folder
                // e.g. external storage not available
                this.error = true;
            });
        } else {
            this.previewFileInfos = this.data.previewFileInfos;
        }
    }

    /** Open folder */
    openFolder(folder: IFolder) {
        const path = folder.path.split('/').filter(x => x).slice(2) as any;
        this.$router.push({ name: 'folders', params: { path }});
    }
}
</script>

<style lang="scss">
/* This cannot be scoped for some reason */
.memories__big-folder-icon > .material-design-icon__svg {
    width: 50%; height: 50%;
}
</style>

<style lang="scss" scoped>
.folder {
    cursor: pointer;
}

.big-icon {
    cursor: pointer;
    z-index: 100;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    transition: opacity 0.2s ease-in-out;

    > .name {
        cursor: pointer;
        width: 100%;
        padding: 0 5%;
        text-align: center;
        font-size: 1.08em;
        word-wrap: break-word;
        text-overflow: ellipsis;
        max-height: 35%;
        line-height: 1em;
        position: absolute;
        top: 65%;
    }

    // Make it white if there is a preview
    .folder.hasPreview > & {
        .folder-icon {
            opacity: 1;
            filter: invert(1) brightness(100);
        }
        .name { color: white; }
    }

    // Show it on hover if not a preview
    .folder:hover > & > .folder-icon { opacity: 0.8; }
    .folder.hasPreview:hover > & { opacity: 0; }

    // Make it red if has an error
    .folder.hasError > & {
        .folder-icon {
            filter: invert(12%) sepia(62%) saturate(5862%) hue-rotate(8deg) brightness(103%) contrast(128%);
        }
        .name { color: #bb0000; }
    }

    > .folder-icon {
        cursor: pointer;
        height: 90%; width: 100%;
        opacity: 0.3;
    }
}

.previews {
    z-index: 3;
    line-height: 0;
    position: absolute;
    height: 100%; width: 100%;
    padding: 2px;
    @media (max-width: 768px) { padding: 1px; }

    > .img-outer {
        background-color: var(--color-background-dark);
        padding: 0;
        margin: 0;
        width: 50%;
        height: 50%;
        display: inline-block;

        .folder.onePreview > & {
            width: 100%; height: 100%;
        }

        > img {
            padding: 0;
            width: 100%;
            height: 100%;
            filter: brightness(50%);
            transition: filter 0.2s ease-in-out;

            &.p-loading, &.p-load-fail {
                display: none;
            }

            .folder:hover & {
                filter: brightness(100%);
            }
        }
    }
}
</style>