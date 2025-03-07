
/**
 * Properties for the carousel component.
 * @param {number} [itemsToShow] - Defines the number of items to be shown in the carousel.
 * @param {number} [itemToScroll] - Defines the number of items to scroll at a time.
 * @param {boolean} [dots] - If true, it shows navigation dots below the carousel.
 * @param {boolean} [arrows] - If true, it shows next and previous arrows for navigation.
 * @param {boolean} [centerMode] - If true, it enables center mode, showing the current item centered.
 * @param {number} [infinite] - if set more then 1 calcuates the data on milisecons and runs the infinite loop
 */

export interface slickStylesType {
    parentBox?: React.CSSProperties;
    slickContainer?: React.CSSProperties;
    sliderComponent?:React.CSSProperties;
    slideBox?:React.CSSProperties;
    arrow?: {
      prevArrow?: React.CSSProperties;
      nextArrow?: React.CSSProperties;
    };
    dots?: {
        parent:React.CSSProperties;
        dot:React.CSSProperties;
    }
  }

export interface cssClassesType{
    parentBox?: React.ComponentPropsWithoutRef<'div'>['className'];
    slickContainer?: React.ComponentPropsWithoutRef<'div'>['className'];
    sliderComponent?:React.ComponentPropsWithoutRef<'div'>['className'];
    slideBox?:React.ComponentPropsWithoutRef<'div'>['className'];
    arrow?: {
      prevArrow?: React.ComponentPropsWithoutRef<'button'>['className'];
      nextArrow?: React.ComponentPropsWithoutRef<'button'>['className'];
    };
    dots?: {
        parent:React.ComponentPropsWithoutRef<'div'>['className'];
        dot:React.ComponentPropsWithoutRef<'span'>['className'];
    }
}

export interface CarasoulProps{
    children?:React.ReactNode;
    itemsToShow?:number;
    itemToScroll?:number;
    dots?:boolean;
    style?:slickStylesType;
    arrows?:boolean;
    centerMode?:boolean;
    scrollDuration?:number;
    infinite?:number;

    gapBetweenBox?:number;
    cssClasses?:cssClassesType;
    
}

// export default CarasoulProps