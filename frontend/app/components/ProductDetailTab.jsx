import ReviewList from "./ReviewList";

const ProductDetailTab = ({ product, activeTab, setActiveTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "Material":
        return (
          <div className="p-4">
            Profile content Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Distinctio, deserunt, quae qui, itaque cupiditate repudiandae
            doloribus commodi iusto porro repellat delectus provident iste
            dolorem ipsam adipisci rem ut culpa at?...
          </div>
        );
      case "Refund & Return":
        return (
          <div className="p-4">
            Dashboard content Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Magnam sunt eum eius blanditiis ipsam, numquam
            incidunt totam, placeat vel vitae accusantium, vero ipsa.
            Reprehenderit debitis aliquam voluptas. Placeat, ex! Aspernatur?
            goes here...
          </div>
        );
      case "Reviews":
        if (product.Reviews?.length === 0) {
          return (
            <div className="p-4">
              This product has no reviews at the moment.
            </div>
          );
        } else if (product.Reviews?.length > 0) {
          return <ReviewList productId={product.id} />;
        }
      case "Contacts":
        return (
          <div className="p-4">
            Contacts content Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Deserunt odit voluptatibus incidunt odio dolores perspiciatis
            sed ut dicta id sit impedit earum, esse distinctio illo aspernatur,
            dolor, nulla praesentium sint? goes here...
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-8 text-sm text-left font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <button
            onClick={() => setActiveTab("Material")}
            className={`inline-block p-4 border-b-2 ${
              activeTab === "Material"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg`}
          >
            Material
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("Refund & Return")}
            className={`inline-block p-4 border-b-2 ${
              activeTab === "Refund & Return"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg`}
          >
            Refund & Return
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("Reviews")}
            className={`inline-block p-4 border-b-2 ${
              activeTab === "Reviews"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg`}
          >
            Reviews
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("Contacts")}
            className={`inline-block p-4 border-b-2 ${
              activeTab === "Contacts"
                ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } rounded-t-lg`}
          >
            Contacts
          </button>
        </li>
      </ul>
      <div className="mt-4 max-w-screen-xl">{renderTabContent()}</div>
    </div>
  );
};

export default ProductDetailTab;
