OC.L10N.register(
    "memories",
    {
    "Memories" : "Emlékek",
    "Yet another photo management app" : "Még egy fényképkezelő alkalmazás",
    "# Memories\n\n* **📸 Photo and Video Timeline**: Sorts photos by date taken, parsed from Exif data.\n* **🤔 Quick Recap**: Jump to anywhere in the timeline instantly.\n* **🖼️ Folders**: Browse your and shared folders with a similar, efficient timeline.\n* **🎦 Slideshow**: View photos from your timeline and folders easily.\n* **📱 Mobile Support**: Relive your memories on devices of any shape and size through the web app.\n* **🗑️ Recycle**: Select and delete multiple photos and videos at once.\n* **⚡️ Fast**: Memories is extremely fast. Period.\n\n## 🚀 Installation\n\n1. Install the app from the Nextcloud app store\n1. ⚒️ Install `exiftool` (see below).\n1. Run `php ./occ memories:index` to generate metadata indices for existing photos.\n1. Open the 📷 Memories app in Nextcloud and set the directory containing your photos. Photos from this directory will be displayed in the timeline, including any photos in nested subdirectories.\n1. Installing the [preview generator](https://github.com/rullzer/previewgenerator) for pre-generating thumbnails is strongly recommended.\n\n## 🔨 Installing Dependencies\nThe exact steps depend on your Nextcloud platform. If you use Docker for your Nextcloud instance, you can install Exiftool by using a custom docker image.\n- **Ubuntu/Debian**: `sudo apt install libimage-exiftool-perl`\n- **Fedora**: `sudo dnf install perl-Image-ExifTool`\n- **Arch Linux**: `sudo pacman -S perl-image-exiftool`\n- **Alpine**: `apk add --no-cache exiftool`\n- **MacOS**: `brew install exiftool`\n- **FreeBSD**: `sudo pkg install p5-Image-ExifTool`" : "# Emlékek\n\n* **📸 Fénykép és videó idővonal**: Készítési dátum alapján rendezi a képeket, Exif adatokból.\n* **🤔 Gyors összefoglalás**: Ugorjon rögtön bárhova az idővonalban.\n* **🖼️ Mappák**: Böngéssze a saját és a megosztott mappákat egy hasonló, hatékony idővonalon.\n* **🎦 Diavetítés**: Tekintse meg könnyedén a képeit az idővonaláról és a mappáiból.\n* **📱 Mobiltámogatás**: Élje át újra emlékeit bármilyen formájú vagy méretű eszközön a webalkalmazással.\n* **🗑️ Törlés**: Válasszon ki és töröljön egyszerre több fényképet és videót.\n* **⚡️ Gyors**: Az Emlékek rendkívül gyors. Ennyi.\n\n## 🚀 Telepítés\n\n1. Telepítse az alkalmazást a Nextcloud alkalmazásboltból\n1. ⚒️ Telepítse az `exiftool`-t (részletek lejjebb).\n1. Futtassa a `php ./occ memories:index` parancsot, hogy létrehozza a meteaadat indexet a meglévő fényképekhez.\n1. Nyissa meg a 📷 Emlékek alkalmazást Nextcloudban, és állítsa be a könyvtárat, ahol a fényképei vannak. Az itt található fényképek megjelennek az idővonalon, beleértve az alkönyvtárakban levő fényképeket.\n1. Erősen ajánlott a [preview generator](https://github.com/rullzer/previewgenerator) telepítése a bélyegképek előzetes létrehozásához.\n\n## 🔨 Függőségek telepítése\nA pontos lépések a Nextcloud telepítés platformjától függ. Ha Dockert használ, akkor az Exiftool egyedi docker image-dzsel telepíthető.\n- **Ubuntu/Debian**: `sudo apt install libimage-exiftool-perl`\n- **Fedora**: `sudo dnf install perl-Image-ExifTool`\n- **Arch Linux**: `sudo pacman -S perl-image-exiftool`\n- **Alpine**: `apk add --no-cache exiftool`\n- **MacOS**: `brew install exiftool`\n- **FreeBSD**: `sudo pkg install p5-Image-ExifTool`",
    "Timeline" : "Idővonal",
    "Folders" : "Mappák",
    "Favorites" : "Kedvencek",
    "Videos" : "Videók",
    "Settings" : "Beállítások",
    "Cannot find this photo anymore!" : "Ez a fénykép már nem található!",
    "Timeline Path" : "Idővonal elérési út",
    "Show hidden folders" : "Rejtett mappák mutatása",
    "Update" : "Frissítés",
    "Error updating settings" : "Hiba a beállítások mentése közben",
    "Cancel" : "Mégse",
    "Delete" : "Törlés",
    "Download" : "Letöltés",
    "Favorite" : "Kedvenc",
    "No photos to show here" : "Nincs megjeleníthető fénykép",
    "Failed to load some photos" : "Nem sikerült betölteni néhány fényképet",
    "{n} selected" : "{n} kiválasztva",
    "You are about to download a large number of files. Are you sure?" : "Sok fájl letöltésére készül. Biztos benne?",
    "You are about to delete a large number of files. Are you sure?" : "Sok fájl törlésére készül. Biztos benne?",
    "Failed to delete files." : "A fájlok törlése sikertelen.",
    "Failed to delete {fileName}." : "{fileName} törlése sikertelen.",
    "Failed to favorite {fileName}." : "A(z) {fileName} kedvencnek jelölése sikertelen.",
    "Failed to favorite files." : "A fájlok kedvencnek jelölése sikertelen."
},
"nplurals=2; plural=(n != 1);");