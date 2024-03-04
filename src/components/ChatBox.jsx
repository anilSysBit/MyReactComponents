import React, { useEffect, useRef, useState } from "react";

// import icons from material UI
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import CancelIcon from "@mui/icons-material/Cancel";


// Material UI component
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

// External Package


const  Chatbox = () => {
  const [activeMessage, setActiveMessage] = useState({});

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreivewImage] = useState(null);
  const [moblieMg, setMobileMg] = useState(false);
  const scrollableRef = useRef(null);



  const conversations = [
    {
      participant: "store",
      messages: [
        {
          sender: "store",
          timestamp: "2024-02-08T12:00:00Z",
          content: "Welcome to our store! How can we assist you?",
        },
      ],
    },
    {
      participant: "store2",
      messages: [
        {
          sender: "user",
          timestamp: "2024-02-08T12:15:00Z",
          // Example of an image message
          product: "2333",
        },
        {
          sender: "user",
          timestamp: "2024-02-08T12:05:00Z",
          content:
            "Hi, I'm interest lorem kjfkd df j ed in purchasing a product.",
        },
        {
          sender: "store",
          timestamp: "2024-02-08T12:10:00Z",
          content: "Sure, which product are you interested in?",
        },
        {
          sender: "user",
          timestamp: "2024-02-08T12:15:00Z",
          // Example of an image message
          image: {
            url: "https://picsum.photos/500/900",
            alt: "Product Image",
          },
        },
        {
          sender: "store",
          timestamp: "2024-02-08T12:10:00Z",
          content: "Sure, which product are you interested in?",
        },
        {
          sender: "user",
          timestamp: "2024-02-08T12:15:00Z",
          // Example of an image message
          image: {
            url: "https://picsum.photos/300",
            alt: "Product Image",
          },
        },
        {
          sender: "store",
          timestamp: "2024-02-08T12:10:00Z",
          content: "http://localhost:5173/products",
        },
      ],
    },
  ];

  const handleShowMessage = (elem) => {
    setActiveMessage(elem);
    setMobileMg(true);
  };

  // Image file management in sending the message form
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the input
    setFile(file);
    const image = URL.createObjectURL(file); // Create object URL for the selected file
    setPreivewImage(image); // Update state with the selected image
  };

  const handleRemovePreview = () => {
    setFile(null);
    setPreivewImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with file and text values (e.g., send to backend)
    console.log("File:", file);
    console.log("Text:", text);
    // Reset input fields after submission if needed
    setFile(null);
    setText("");
    setPreivewImage(null);
  };

  const ProductMessageThumbnail = ({ product }) => {
    const productThumbDetail = {
      name: "Apple Iphone 2 x Pro",
      imgSrc:
        "https://th.bing.com/th/id/OIP.nvdM5sEm4DqG8oZb8nNStQHaHa?rs=1&pid=ImgDetMain",
      price: "2343",
    };
    return (
      <div className="product_message_thumbnail">
        <div className="img_box">
          <img src={productThumbDetail.imgSrc} alt="data" loading="lazy" />
        </div>
        <div className="product_desc">
          <p className="product_n">{productThumbDetail.name}</p>
          <p className="price">Rs. {productThumbDetail.price}</p>
        </div>
      </div>
    );
  };

  const MessageItem = ({ message }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [modalCaption, setModalCaption] = useState("");

    const handleImageClick = () => {
      setModalVisible(true);
      setModalImage(message.image.url);
      setModalCaption(message.image.alt);
    };

    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const renderContentWithLinks = (content) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = content.split(urlRegex);
      return parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              style={{ color: "blue", textDecoration: "underline" }}
              key={index}
              href={part}
              target="_blank"
            >
              {part}
            </a>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      });
    };


    return (
      <div>
        {message.content && <p>{renderContentWithLinks(message.content)}</p>}
        {message.product && (
          <ProductMessageThumbnail productId={message.product} />
        )}
        {message.image && (
          <span className="message_img" onClick={handleImageClick}>
            <img
              loading="lazy"
              src={message.image.url}
              alt={message.image.alt}
            />
          </span>
        )}

        {/* Modal */}
        {modalVisible && (
          <div id="myModal" className="modal" onClick={handleCloseModal}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <div className="img_box">
              <img
                src={modalImage}
                alt={modalCaption}
                className="modal-content"
              />
              <p id="caption">{modalCaption}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MessageListing = () => {
    const [messageLoadStatus, setMessageLoadStatus] = useState(false);

    const handleLoadMessage = () => {
      setMessageLoadStatus(true);

      const timeoutId = setTimeout(() => {
        setMessageLoadStatus(false); // Change isVisible state to false after 2000 milliseconds (2 seconds)
      }, 2000);

      // Clear the timeout when the component unmounts or when isVisible changes to false
      return () => clearTimeout(timeoutId);
    };

    // const handleTextChange = (e) => {
    //   let newValue = e.target.value;
    //   setText(newValue);
    // };

    useEffect(() => {
      // Scroll to the bottom when the component mounts or when content changes
      if (scrollableRef.current) {
        const isScrolledToBottom = scrollableRef.current.scrollHeight - scrollableRef.current.scrollTop === scrollableRef.current.clientHeight;
        if (!isScrolledToBottom) {
          scrollableRef.current.scrollIntoView({
            behavior: "smooth",
            block: 'end',
          });
        }
      }
      console.log("Unconditional Rendering")
    }, [activeMessage]);
  


    return (
      <div className="message_listing">
        <div
          className="message_mgmt"
          style={{ height: "85%", overflowY: "auto" }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "darkblue",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleLoadMessage}
          >
            {messageLoadStatus ? (
              <CircularProgress color="success" size={20} />
            ) : (
              " Show More"
            )}
          </p>
          <p className="warn-data"
            style={{
              fontSize: "13px",
              fontFamily: "Arial",
              width: "100%",
              textAlign: "center",
              padding: "40px",
            }}
          >
            Please do not provide your personal data, communicate or make
            payment outside of Jagatpur E.Bazar website/app.{" "}
          </p>
          <div className="main_message">
          {activeMessage?.messages &&
            activeMessage?.messages.map((elem, index) => {
              return (
                <span
                  key={index}
                  className={`actual_message ${
                    elem.sender == "store" ? "store_message" : "user_message"
                  }`}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        elem.sender == "store"
                          ? "var(--gb-green-color)"
                          : "var(--gb-orange-color)",
                    }}
                  >
                    {elem.sender == "store" ? "S" : "U"}
                  </Avatar>
                  <MessageItem message={elem} />
                </span>
              );
            })}
          </div>
            <span className="scroll" ref={scrollableRef}>-</span>
        </div>

        {/* Preview Image Before sending */}
        {previewImage && (
          <div className="img_preview">
            <div className="img_preview_box">
              <img
                src={previewImage}
                alt="previewImage"
                loading="lazy"
                decoding="async"
                style={{ maxWidth: "100%", maxHeight: "100px" }}
              />
              <span
                className="cancel_img"
                onClick={handleRemovePreview}
                style={{ color: "white", cursor: "pointer" }}
              >
                <CancelIcon />
              </span>
            </div>
          </div>
        )}

        {/* Message input */}
        <div className="send_message">
          <form action="#" onSubmit={handleSubmit}>
            <div className="form-control">
              <span className="file_span">
                <input
                  className="file_input"
                  type="file"
                  name="pictures"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="span_icon">
                  <ImageIcon sx={{ height: "100%", width: "100%" }} />
                </span>
              </span>
              <input
                type="text"
                id="dotm"
                name="dotm"
                placeholder="Type your message here..."
                className="message_input"
                autoFocus
                onChange={(e)=>setText(e.target.value)}
                value={text}
              />

              <button type="submit">
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const UserNotLogged = () => {
    return (
      <div className="user_not_logged">
        <ChatBubbleOutlineRoundedIcon sx={{ fontSize: "30px" }} />
        <p className="exclusive_app">Use the App for Exclusive Offers!</p>
        <p className="ousc">
          Once you start a new conversation, you'll see it listed here.
        </p>
        <p className="login_signup">
          <span>Login</span>/<span>Signup</span>
          <br />
          <button
            style={{ marginTop: "10px" }}
            className="button"
          >
            Go Back
          </button>
        </p>
      </div>
    );
  };

  const MainMessageBox = () => {
    return (
      <>
        <div className={`left ${moblieMg ? "close_mb" : "open_mb"}`}>
          <div className="message_logo">
            <TextsmsRoundedIcon />
            <p>Messages</p>
          </div>
          <div className="my_messages_stack">
            {conversations.map((elem, index) => {
              return (
                <div
                  className="avatar_name_box"
                  onClick={() => handleShowMessage(elem)}
                >
                  <div className="user_message_info">
                    <Avatar sx={{ backgroundColor: "black" }}>N</Avatar>
                    <p>{elem.participant}</p>
                  </div>
                  <p className="message_preview">preview mesasage......</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`right ${moblieMg ? "open_mb" : "close_mb"}`}>
          <div className="cross_spacing">
            <p>
              <Avatar sx={{ bgcolor: "black" }}>S</Avatar>Store1
            </p>
            <span className="close_rounded">
              <CloseRoundedIcon
                sx={{
                  fontSize: "40px",
                  cursor: "pointer",
                }}
              />
            </span>
            <button className="button" onClick={() => setMobileMg(false)}>
              Back
            </button>
          </div>
          <div className="main_message_container">
            {/* There are two conditions: 1. When user has not logged in 
                2. When user has logged in
                */}
            {/* User Logged IN */}
            <div className="user_logged_in">
              {!Object.keys(activeMessage).length ? (
                <span className="initial_message">
                  <ChatBubbleOutlineRoundedIcon sx={{ fontSize: "40px" }} />
                  <p>
                    Once You start a conversation. You'll see it listed here
                  </p>
                </span>
              ) : (
                <MessageListing />
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  const userStatus = true;

  return (
    <div
      className={`jeb_message_box`}
    >
      <div className="message_box_sm">
        {userStatus ? <MainMessageBox /> : <UserNotLogged />}
      </div>
    </div>
  );
};

export default Chatbox