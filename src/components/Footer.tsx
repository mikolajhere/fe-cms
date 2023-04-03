import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-700 py-6 px-3">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="text-sm font-bold text-gray-300 flex items-center gap-1">
            <Link className="hover:text-gray-400" to="#" title="Mockup">
              Privacy policy
            </Link>
            {" | "}
            <Link className="hover:text-gray-400" to="#" title="Mockup">
              Regulations
            </Link>
            {" | "}
            <Link className="hover:text-gray-400" to="#" title="Mockup">
              Other
            </Link>
          </div>
          <div className="text-sm font-bold text-gray-300 flex items-center gap-1">
            <Link
              className="hover:text-gray-400"
              to="https://github.com/mikolajhere"
            >
              @mikolajhere
            </Link>
            {" | "}
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
