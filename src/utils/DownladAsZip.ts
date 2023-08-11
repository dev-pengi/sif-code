import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { File } from '@/constants';

const downloadFilesAsZip = (files: File[], folderName: string) => {
    const zip = new JSZip();
    const folder = zip.folder(folderName);
  
    files.forEach(file => {
      folder?.file(file.name, file.content);
    });
  
    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, `${folderName}.zip`);
      })
      .catch(error => {
        console.error('Error generating the zip file:', error);
      });
  };
  
  export default downloadFilesAsZip;