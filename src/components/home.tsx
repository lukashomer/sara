import { useContext, useEffect } from "react";
import { WorkspacePaneContext } from "@/App";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { PanelLeft } from "lucide-react";

const Home = () => {
  const { setIsNewConversationDialogOpen, toggleHistorySidebar } =
    useContext(WorkspacePaneContext);

  // Handler for input focus
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsNewConversationDialogOpen(true);
  };

  // Use useEffect to handle resize events and adjust height
  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 64; // 16 * 4 = 64px (h-16)
      const vh = window.innerHeight;
      const contentHeight = vh - headerHeight;
      document.documentElement.style.setProperty(
        "--content-height",
        `${contentHeight}px`
      );
    };

    // Initial calculation
    updateHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 sm:h-16 border-b hidden md:flex sm:px-6 justify-start items-center">
        <Link to="/" className="flex items-center">
          <img
            src="https://i0.wp.com/www.reso.org/wp-content/uploads/2020/05/Douglas-Elliman-Logo.png?fit=1024%2C194&ssl=1"
            alt="Douglas Elliman Logo"
            className="h-8"
          />
        </Link>
      </header>
      {/* Main Content */}
      <div className="flex h-[var(--content-height)] overflow-hidden">
        <div className={`w-full md:w-[100%] h-full`}>
          <Layout>
            <div className="flex flex-col flex-1 h-full">
              <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                <button
                  onClick={toggleHistorySidebar}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Toggle chat history"
                >
                  <PanelLeft size={20} />
                </button>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <Link to="/" className="flex items-center">
                    <img
                      src="https://i0.wp.com/www.reso.org/wp-content/uploads/2020/05/Douglas-Elliman-Logo.png?fit=1024%2C194&ssl=1"
                      alt="Douglas Elliman Logo"
                      className="h-8"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6">
                <h1 className="font-normal text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-8 text-center">
                  How can I assist you today?
                </h1>
                <div className="bg-[#f8f8f8] rounded-2xl shadow-md px-4 sm:px-6 md:px-8 py-0 w-full max-w-[600px] flex flex-col">
                  <div className="flex flex-1 justify-start w-full py-3 sm:py-4">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      onFocus={handleInputFocus}
                      className="border-none outline-none bg-transparent text-base sm:text-lg py-3 sm:py-4 w-full"
                    />
                  </div>
                  <div className="flex justify-end w-full pb-3 sm:pb-4">
                    <button
                      className="bg-primary transition-colors text-white rounded-full w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center ml-4 sm:ml-6 text-xl"
                      tabIndex={-1}
                      aria-label="Send"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default Home;
