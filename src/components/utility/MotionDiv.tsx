import { ReactNode, useEffect, useState, useRef } from "react";

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  infinite?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
};

const MotionDiv: React.FC<MotionDivProps> = ({ children, className = "", infinite = false, direction = "bottom" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setVisible(true);
        } else if (infinite) {
          setVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [infinite]);

  const getTransform = () => {
    switch (direction) {
      case "top":
        return visible ? "translateY(0)" : "translateY(-20px)";
      case "bottom":
        return visible ? "translateY(0)" : "translateY(20px)";
      case "left":
        return visible ? "translateX(0)" : "translateX(-20px)";
      case "right":
        return visible ? "translateX(0)" : "translateX(20px)";
      default:
        return "translateY(0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
};

export default MotionDiv;