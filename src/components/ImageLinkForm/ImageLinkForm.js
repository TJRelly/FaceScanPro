import "./ImageLinkForm.css"

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  const onFormSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={onFormSubmit} id="image-link-form">
      <p className="f4 mt-6 text-white backdrop-blur-sm w-fit mx-auto px-2">
        {"This Magic Brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div
        id="search-div"
        className="w-11/12 md:w-8/12 mx-auto my-6 shadow-xl p-2 backdrop-blur-sm"
      >
        <div className="flex justify-center" autoComplete="off">
          {/* Search Field */}
          <input
            id="search-field"
            type="text"
            placeholder="Copy image address here..."
            className="p-2 mr-1 text-gray-600 w-3/4"
            onChange={onInputChange}
            autoComplete="on"
          />
          {/* Detect Button */}
          <button
            type="submit"
            className="white pointer p-2 m-auto w-1/4 bg-blue-400 hover:text-white hover:bg-[#da59da] ease-in duration-200 tracking-wide"
          >
            Detect
          </button>
        </div>
      </div>
    </form>
  )
}

export default ImageLinkForm
