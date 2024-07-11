"use client";
import productImageService from "lib/utils/productImageService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ImageEditPage = ({ params }) => {
  const imageId = params.imageId;
  const productId = params.id;
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [oldFileUrl, setOldFileUrl] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchImage();
    async function fetchImage() {
      try {
        const img = await productImageService.getSingleImage(imageId);
        setName(img.name);
        setOldFileUrl(img.image_url);
      } catch (err) {
        console.log(err);
      }
    }
  }, [imageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await productImageService.updateProductImage(
        imageId,
        formData
      );
      setIsSuccess(true);
      setMsg("Image updated successfully.");
      console.log(response);
    } catch (err) {
      setError(err);
    }
  };

  if (isSuccess) {
    setTimeout(() => {
      router.push(`/admin/product/${productId}/image`);
    }, 2000);
  }

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-msg" role="alert">
              {error}
            </div>
          )}
          {msg && (
            <div className="success-msg" role="alert">
              {msg}
            </div>
          )}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Product Id</p>
              <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
                {productId}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Product Name</p>
              <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
                some product name
              </p>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mr-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-text-field"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mr-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              {oldFileUrl && <p>{oldFileUrl}</p>}
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setOldFileUrl("");
                }}
                className="input-file-field"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default ImageEditPage;
