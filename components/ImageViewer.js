import {Modal} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageViewer = props =>{
    return(
    <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={props.image}/>
            </Modal>
    );
}

export default ImageViewer;