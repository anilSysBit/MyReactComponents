import { CSSProperties } from "styled-components";

interface MagnifierTypes{
    image:string;
    mainContainerStyle?:CSSProperties,
    zoomLevel?:number;
    zaliHeight?:number;
    zaliWidth?:number;
    previewMultiple?:number;
    width?:number;
    height?:number;
    previewMargin?:number;
    previewClassName?:string;
    containerClassName?:string;
    zaliMultiple?:number;
    magnifyOnImage?:boolean;
}

export default MagnifierTypes