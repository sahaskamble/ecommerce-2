export default function Footer() {
  return (
    <footer className="bg-foreground/5 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">floop.co.in</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Sustainable fashion for the modern generation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-sm text-gray-600 dark:text-gray-300">
          © 2024 floop.co.in. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 