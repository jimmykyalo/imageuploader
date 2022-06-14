import React, {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Image, Button, Container } from 'react-bootstrap'
import { uploadImage } from '../actions'
import { UPLOAD_IMAGE_RESET } from '../constants'
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import Loader from '../components.js/Loader'
function UploadScreen() {

    // change load button text
    const locale = {
        Load: 'Select Image'
    }
    //create ref for toast-ui image editor
    const editorRef = useRef();
    // white theme settings
    var whiteTheme = {
        'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
        'common.bisize.width': '251px',
        'common.bisize.height': '21px',
        
        'common.backgroundColor': '#fff',
        'common.border': '1px solid #c1c1c1',
      
        // header
        'header.backgroundImage': 'none',
        'header.backgroundColor': 'transparent',
        'header.border': '0px',
      
        // load button
        'loadButton.backgroundColor': '#fff',
        'loadButton.border': '1px solid #ddd',
        'loadButton.color': '#222',
        'loadButton.fontFamily': "'Noto Sans', sans-serif",
        'loadButton.fontSize': '12px',
      
        // download button
        'downloadButton.backgroundColor': '#fdba3b',
        'downloadButton.border': '1px solid #fdba3b',
        'downloadButton.color': '#fff',
        'downloadButton.fontFamily': "'Noto Sans', sans-serif",
        'downloadButton.fontSize': '12px',
      
        // main icons
        'menu.normalIcon.color': '#8a8a8a',
        'menu.activeIcon.color': '#555555',
        'menu.disabledIcon.color': '#434343',
        'menu.hoverIcon.color': '#e9e9e9',
        'menu.iconSize.width': '24px',
        'menu.iconSize.height': '24px',
      
        // submenu icons
        'submenu.normalIcon.color': '#8a8a8a',
        'submenu.activeIcon.color': '#555555',
        'submenu.iconSize.width': '32px',
        'submenu.iconSize.height': '32px',
      
        // submenu primary color
        'submenu.backgroundColor': 'transparent',
        'submenu.partition.color': '#e5e5e5',
      
        // submenu labels
        'submenu.normalLabel.color': '#858585',
        'submenu.normalLabel.fontWeight': 'normal',
        'submenu.activeLabel.color': '#000',
        'submenu.activeLabel.fontWeight': 'normal',
      
        // checkbox style
        'checkbox.border': '1px solid #ccc',
        'checkbox.backgroundColor': '#fff',
      
        // rango style
        'range.pointer.color': '#333',
        'range.bar.color': '#ccc',
        'range.subbar.color': '#606060',
      
        'range.disabledPointer.color': '#d3d3d3',
        'range.disabledBar.color': 'rgba(85,85,85,0.06)',
        'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',
      
        'range.value.color': '#000',
        'range.value.fontWeight': 'normal',
        'range.value.fontSize': '11px',
        'range.value.border': '0',
        'range.value.backgroundColor': '#f5f5f5',
        'range.title.color': '#000',
        'range.title.fontWeight': 'lighter',
      
        // colorpicker style
        'colorpicker.button.border': '0px',
        'colorpicker.title.color': '#000',
    };
    // create dispatch variable for react-redux action
    const dispatch = useDispatch()
    //  covert URI to blob
    const dataURItoBlob= (dataURI)=> {
        var byteString = atob(dataURI.split(",")[1]);
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([ab], { type: mimeString });
    }
    // image upload reducer
    const imageUpload = useSelector(state=>state.imageUpload)
    const {loading, success, imageDetails, error} = imageUpload
    useEffect(() => {
        // select  download button from DOM
        var elements = document.getElementsByClassName("tui-image-editor-download-btn");
        if(elements[0]){
            // remove  download button from DOM
            elements[0].parentNode.removeChild(elements[0]);
            elements[0].remove()
            // add cutom button with function to upload edited image so server
            var parents = document.getElementsByClassName("tui-image-editor-header-buttons");
            let btn = document.createElement("button");
            btn.innerHTML = "Upload";
            parents[0].appendChild(btn)
            btn.onclick=() =>{
                const editorInstance = editorRef.current.getInstance();
                const data = editorInstance.toDataURL();
                // convert dataURI to blob
                var blob = dataURItoBlob(data);
                // convert blob to image
                const file = new File([blob], 'editedimage.jpeg', {
                type: "image/jpeg",
                lastModified: new Date(),
                });
                // create formData and send to server 
                const formData = new FormData()
                formData.append('uploadedimage', file)
                dispatch(uploadImage(formData))        
            }            
        }
            
    }, [dispatch, imageDetails])

  return (
    
        
                    <div className='d-flex mt-1 flex-column align-items-center'>
                        {loading?<Loader />: error? <Alert  className='mt-4 w-100' variant='danger'>{error}. Please reload the page and try again</Alert>: success?
                            <Container className='d-flex flex-column'>
                                <Alert  className='mt-4 w-100' variant='success'>Image Uploaded Successfully</Alert>
                                <Button style={{width:'max-content'}} className='mt-4 ms-auto' onClick={()=>dispatch({type:UPLOAD_IMAGE_RESET})} variant="primary">Upload New</Button>
                                <Image fluid className='preview-image' src={imageDetails.image} alt={imageDetails._id} />
                            </Container>
                            : 
                            <ImageEditor
                                ref={editorRef}
                                
                                includeUI={{
                                
                                
                                menu:  ['crop', 'flip', 'rotate', 'draw', 'icon', 'text', 'filter'],
                                initMenu: 'crop',
                                locale: locale,
                                theme: whiteTheme,
                                uiSize: {
                                width: '100%',
                                    height: '100vh',
                                },
                                menuBarPosition: 'right',
                                }}
                                
                                cssMaxWidth={900}
                                selectionStyle={{
                                cornerSize: 20,
                                rotatingPointOffset: 70,
                                }}
                                usageStatistics={false}
                            />}
                        
                    </div>
    
  )
}

export default UploadScreen