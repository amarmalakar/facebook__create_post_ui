import { useState } from "react";

const SearchGif = () => {
    const [isGifyContainer, setIsGifyContainer] = useState(false);
    const [imgSrc, setImgSrc] = useState("");

    // const isGify = () => setIsGifyContainer(!isGifyContainer);

    const debounce = (func, delay) => {
        let timeout;
        return function (...args) {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const gifyTextHandler = debounce(async (e) => {
        const res = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=d8NZea3Z4dQt0pgCORckZFofhx5E8oRS&q=${e.target.value}&limit=1&offset=0&rating=g&lang=en`);
        const data = await res.json();
        setImgSrc(data.data[0]?.images?.preview_webp?.url);
    }, 300);

  return (
        <div className="gif__form">
            <textarea
                name="textMessage"
                id="textMessage"
                placeholder="Write Post..."
            ></textarea>

            <div className="gif__relative">
                <div className="tag__btn--grid">
                    <button className="tag__btn" onClick={() => setIsGifyContainer(!isGifyContainer)}>
                    GIF
                    </button>
                </div>
                {isGifyContainer && (
                    <div className="gif__container">
                        <input
                            type="text"
                            className="gif__input"
                            placeholder="Write Here Some To Get Gif..."
                            onChange={gifyTextHandler}
                        />
                        <div className="gif">
                            <img src={imgSrc} alt="" id="gify" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchGif;
