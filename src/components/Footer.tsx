import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-700 py-6 px-3">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="text-sm font-bold text-gray-300 flex items-center gap-1">
            © <span>{new Date().getFullYear()}</span> by
            <Link
              className="hover:text-gray-400"
              to="https://github.com/mikolajhere"
            >
              @mikolajhere
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
