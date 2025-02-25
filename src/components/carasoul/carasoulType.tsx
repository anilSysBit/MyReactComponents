
/**
 * Properties for the carousel component.
 * @param {number} [itemsToShow] - Defines the number of items to be shown in the carousel.
 * @param {number} [itemToScroll] - Defines the number of items to scroll at a time.
 * @param {boolean} [dots] - If true, it shows navigation dots below the carousel.
 * @param {boolean} [arrows] - If true, it shows next and previous arrows for navigation.
 * @param {boolean} [centerMode] - If true, it enables center mode, showing the current item centered.
 * @param {number} [infinite] - if set more then 1 calcuates the data on milisecons and runs the infinite loop
 */

interface CarasoulProps{
    children?:React.ReactNode;
    itemsToShow?:number;
    itemToScroll?:number;
    dots?:boolean;
    arrows?:boolean;
    centerMode?:boolean;
    infinite?:number; 
    
}

export default CarasoulProps