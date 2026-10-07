import "./PostLost.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
  FaCloudUploadAlt,
  FaArrowRight,
} from "react-icons/fa";

function PostLost() {
  return (
    <div className="post-page">
      <Sidebar />

      <div className="post-content">
        <Navbar />

        <h1 className="page-title">Post Lost Item</h1>

        <div className="steps">

          <div className="step active">
            <div className="step-circle">1</div>
            <p>Item Details</p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-circle">2</div>
            <p>Verification</p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-circle">3</div>
            <p>Review</p>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-circle">4</div>
            <p>Publish</p>
          </div>

        </div>

        <div className="form-container">

          <div className="image-section">

            <h3>Upload Image</h3>

            <label className="upload-box">

              <input type="file" hidden />

              <FaCloudUploadAlt className="upload-icon" />

              <h4>Drag & Drop</h4>

              <p>or click to upload</p>

              <span>PNG, JPG up to 5MB</span>

            </label>

          </div>

          <div className="details-section">

            <div className="row">

              <div className="input-box">

                <label>Item Title *</label>

                <input
                  type="text"
                  placeholder="Black Wallet"
                />

              </div>

              <div className="input-box">

                <label>Category *</label>

                <select>

                  <option>Select Category</option>

                  <option>Electronics</option>

                  <option>Books</option>

                  <option>Accessories</option>

                  <option>ID Cards</option>

                  <option>Others</option>

                </select>

              </div>

            </div>

            <div className="row">

              <div className="input-box">

                <label>Date Lost</label>

                <input type="date" />

              </div>

              <div className="input-box">

                <label>Tags</label>

                <input
                  type="text"
                  placeholder="wallet, black"
                />

              </div>

            </div>

            <div className="input-box">

              <label>Last Seen Location</label>

              <input
                type="text"
                placeholder="Library"
              />

            </div>

            <div className="input-box">

              <label>Description</label>

              <textarea
                rows="6"
                placeholder="Describe your lost item..."
              ></textarea>

            </div>

          </div>

        </div>

        <div className="button-area">

          <button className="next-btn">

            Next

            <FaArrowRight />

          </button>

        </div>

      </div>
    </div>
  );
}

export default PostLost;