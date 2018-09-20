





                                         //////////////////////////////  SET OPTIONS  //////////////////////////////


var inputFolder = Folder.selectDialog("Select a folder to proccess"); //  Select Images to Size
var outputFolder = Folder.selectDialog("Select Destination for proccessed files"); //  Select Destination for Sized Files

var endW = parseFloat(prompt("Please Enter Desired Width (in px)",500,"Width"));
var endH = parseFloat(prompt ("Please Enter Desired Height (in px)",500,"Height"));
var prefix = prompt ("Add a prefix to your new files","resized-","Prefix");

if (inputFolder && outputFolder && endW > 0 && endH > 0){
        
            var doc = createTempDoc(endW,endH);  // create temporary Illusrtartor document
            
            //var initFile = File('C:/Users/ken/Desktop/example.ai');   
            
            var files = inputFolder.getFiles ();

            for (var i = 0; i < files.length; i++) {
                
                    if (files[i].name.match(/\.(jpg|jpeg|gif|png|tiff|eps|ai|pdf)$/i) !== null) {
                        
                        structure(files[i],doc,outputFolder,prefix);
                        
                        }
                
                }
        
            doc.close(SaveOptions.DONOTSAVECHANGES); //  Close Temporary Document
            
        }



                                         //////////////////////////////  STRUCTURE  //////////////////////////////

function structure(initFile,doc,outputFolder,prefix) {

var placedItem = placeItem(initFile, doc);  // place the item in the document

sizeItem(placedItem,doc); // size and position item

exportDoc(doc,initFile.name,outputFolder,prefix);

placedItem.remove();  //  Clear Temporary Artboard

}

                                         //////////////////////////////  FUNCTIONS  //////////////////////////////

//  Open Temporary Illustrator Document with Desired Artboard Size

function createTempDoc(docWidth,docHeight) {
    var tempDoc = app.documents.add(DocumentColorSpace.RGB,docWidth,docHeight,1);
    return tempDoc;
}

//  Place Image on Temporary Document
function placeItem(filePath, doc) {
    var placedItem = doc.placedItems.add();
    
    placedItem.file = filePath;
   
    return placedItem;
    
}

//  Size the Image to Fit Onto the Artboard at Center
function sizeItem(item,doc) {
     
    var docW = doc.width;
    var docH = doc.height;
    var initW = item.width;
    var initH = item.height;
    var docWToH = docW / docH;
    var itemWToH = initW / initH;
    var retH;
    var retW;
    var varboarder;
    var retX;
    var retY;
            
    if(docWToH > itemWToH) {
            retH = docH;
            retW = docH * itemWToH;
            retX = (docW - retW) / 2;
            retY = docH;
        }      
     else {
            retW = docW;
            retH = docW / itemWToH;
            retX = 0;
            retY = (docH + retH) / 2;
         }
      
      item.width = retW;
      item.height = retH;
      item.position = Array(retX,retY);
    
    }



//  Export Illustrator Document to Destination
function exportDoc(doc, initFileName, exportPath,prefix) {
                
                var newName = prefix + initFileName;
                
                var exportOptions = new ExportOptionsJPEG();
                var type = ExportType.JPEG;
                var fileSpec = new File(exportPath+'/'+newName);

                exportOptions.artBoardClipping = true;
                exportOptions.qualitySetting = 70;
                
                doc.exportFile( fileSpec, type, exportOptions );

}