import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Meher Embroidered Lawn",
    category: "Ready to wear",
    price: 8490,
    oldPrice: 9990,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    color: "Sage green",
  },
  {
    id: 2,
    name: "Zaraara Printed Co-ord",
    category: "Ready to wear",
    price: 6990,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    color: "Warm ivory",
  },
  {
    id: 3,
    name: "Gulnaar Unstitched Set",
    category: "Unstitched",
    price: 5290,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
    color: "Rosewood",
  },
  {
    id: 4,
    name: "Noor Chiffon Edit",
    category: "Festive",
    price: 12490,
    oldPrice: 14990,
    tag: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    color: "Midnight blue",
  },
];

const categories = [
  {
    name: "Ready to wear",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=850&q=85",
  },
  {
    name: "Unstitched",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=850&q=85",
  },
  {
    name: "Festive edit",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=850&q=85",
  },
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.3 4.3" /></>,
    bag: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    heart: <path d="M20.5 8.7c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.5 4.5 0 0 1 8.5-1.9 4.5 4.5 0 0 1 8.5 1.9Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="18" cy="18" r="1.5" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All pieces");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All pieces" || product.category === activeCategory;
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query);
      return matchesCategory && matchesWishlist && matchesSearch;
    });
  }, [activeCategory, searchTerm, wishlist, wishlistOnly]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing
        ? items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function toggleWishlist(productId) {
    setWishlist((items) =>
      items.includes(productId)
        ? items.filter((id) => id !== productId)
        : [...items, productId],
    );
  }

  function selectCategory(category) {
    setActiveCategory(category);
    setMenuOpen(false);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="announcement">
        <span>Complimentary delivery on orders above Rs. 5,000</span>
        <span className="announcement-divider">✦</span>
        <span>Thoughtfully made, made for you</span>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <nav className="main-nav" aria-label="Main navigation">
            {["New arrivals", "Ready to wear", "Unstitched", "Festive"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  selectCategory(
                    item === "New arrivals"
                      ? "All pieces"
                      : item === "Festive"
                        ? "Festive"
                        : item,
                  )
                }
              >
                {item}
              </button>
            ))}
          </nav>
          <a className="brand" href="#" aria-label="Aurelle home">
            <span className="brand-mark">A</span>
            <span className="brand-name">AURELLE</span>
            <span className="brand-subtitle">PAKISTANI WOMENSWEAR</span>
          </a>
          <div className="header-actions">
            <button
              className="icon-button search-trigger"
              aria-label="Search products"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Icon name={searchOpen ? "close" : "search"} />
            </button>
            <button
              className="icon-button wishlist-trigger"
              aria-label={`${wishlist.length} saved items`}
              onClick={() => {
                setActiveCategory("All pieces");
                setSearchTerm("");
                setWishlistOnly((savedOnly) => !savedOnly);
                setNotice(
                  wishlistOnly
                    ? "Showing all pieces"
                    : wishlist.length
                      ? `Showing ${wishlist.length} saved piece${wishlist.length === 1 ? "" : "s"}`
                      : "Save a piece with the heart to find it here",
                );
                window.setTimeout(() => setNotice(""), 2400);
              }}
            >
              <Icon name="heart" />
              {wishlist.length > 0 && <span className="action-count">{wishlist.length}</span>}
            </button>
            <button
              className="icon-button bag-trigger"
              aria-label={`Open shopping bag, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
            >
              <Icon name="bag" />
              <span className="action-count">{cartCount}</span>
            </button>
          </div>
        </div>
        {searchOpen && (
          <form
            className="search-bar"
            onSubmit={(event) => {
              event.preventDefault();
              document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Icon name="search" size={18} />
            <input
              autoFocus
              aria-label="Search collection"
              placeholder="Search outfits, colors, collections..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button type="button" className="search-clear" onClick={() => setSearchTerm("")}>
                Clear
              </button>
            )}
          </form>
        )}
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {["New arrivals", "Ready to wear", "Unstitched", "Festive"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  selectCategory(
                    item === "New arrivals"
                      ? "All pieces"
                      : item === "Festive"
                        ? "Festive"
                        : item,
                  )
                }
              >
                {item}<Icon name="arrow" size={16} />
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero" aria-label="Spring collection">
          <div className="hero-image" />
          <div className="hero-wash" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> AURELLE JOURNAL · VOL. 01 <span /></p>
            <h1>Everyday,<br /><em>with intention.</em></h1>
            <p className="hero-copy">
              A softer take on getting dressed. Discover pieces made to move with you, from first light to last plans.
            </p>
            <button className="button button-light" onClick={() => selectCategory("All pieces")}>
              MEET THE NEW EDIT <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="hero-caption"><span>01</span> / THE EVERYDAY EDIT</div>
          <div className="hero-side-note">DESIGNED HERE · WORN EVERYWHERE</div>
        </section>

        <section className="service-strip" aria-label="Our promises">
          <div><Icon name="truck" size={21} /><span>Complimentary delivery over Rs. 5,000</span></div>
          <span className="service-separator">✳</span>
          <div><span className="service-star">✧</span><span>Easy exchanges within 7 days</span></div>
          <span className="service-separator">✳</span>
          <div><span className="service-star">♡</span><span>Made with intention in Pakistan</span></div>
        </section>

        <section className="category-section section-shell">
          <div className="section-heading category-heading">
            <div>
              <p className="eyebrow">A LITTLE SOMETHING FOR EVERY DAY</p>
              <h2>Find your <em>feeling.</em></h2>
            </div>
            <p className="section-note">A considered wardrobe, with a little room for wonder.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                className={`category-card category-card-${index + 1}`}
                key={category.name}
                onClick={() =>
                  selectCategory(category.name === "Festive edit" ? "Festive" : category.name)
                }
              >
                <img src={category.image} alt="" loading="lazy" />
                <span className="category-overlay" />
                <span className="category-text">
                  <span className="category-kicker">EXPLORE THE EDIT</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-link">SHOP NOW <Icon name="arrow" size={15} /></span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="collection-section" id="collection">
          <div className="section-shell">
            <div className="section-heading collection-heading">
              <div>
                <p className="eyebrow">THE PIECES YOU’LL LIVE IN</p>
                <h2>A new kind of <em>classic.</em></h2>
              </div>
              <a className="text-link" href="#collection">VIEW ALL PIECES <Icon name="arrow" size={15} /></a>
            </div>
            <div className="filter-row" role="group" aria-label="Filter products">
              {["All pieces", "Ready to wear", "Unstitched", "Festive"].map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "filter-chip active" : "filter-chip"}
                  onClick={() => { setActiveCategory(category); setWishlistOnly(false); }}
                >
                  {category}
                </button>
              ))}
              <span className="product-count">{filteredProducts.length} PIECES</span>
            </div>
            {filteredProducts.length ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      {product.tag && <span className="product-tag">{product.tag}</span>}
                      <button
                        className={`wishlist-button ${wishlist.includes(product.id) ? "saved" : ""}`}
                        aria-label={
                          wishlist.includes(product.id) ? "Remove from saved items" : "Save item"
                        }
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Icon name="heart" size={19} />
                      </button>
                      <button className="quick-add" onClick={() => addToCart(product)}>
                        ADD TO BAG <span>+</span>
                      </button>
                    </div>
                    <div className="product-info">
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.color} · {product.category}</p>
                      </div>
                      <div className="product-prices">
                        <span>{formatPrice(product.price)}</span>
                        {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-search">
                <p>
                  {wishlistOnly && !wishlist.length
                    ? "You haven’t saved any pieces yet."
                    : searchTerm
                      ? `No pieces found for “${searchTerm}”.`
                      : "No pieces in this edit just yet."}
                </p>
                <button onClick={() => { setSearchTerm(""); setActiveCategory("All pieces"); setWishlistOnly(false); }}>
                  {wishlistOnly ? "Browse all pieces" : "Clear search and filters"}
                </button>
              </div>
            )}
            <div className="collection-footer">
              <span>Made slowly. Worn often.</span>
              <span>01 — 04</span>
            </div>
          </div>
        </section>

        <section className="story-section">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="A moment of everyday style"
              loading="lazy"
            />
            <span className="story-image-caption">AURELLE, IN HER ELEMENT</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A NOTE FROM US</p>
            <h2>Clothes with a little more <em>meaning.</em></h2>
            <p>
              We believe getting dressed can feel like coming home to yourself. So we bring
              thoughtful design, familiar craft and a fresh point of view to pieces made to stay
              in your story.
            </p>
            <a className="text-link" href="#collection">GET TO KNOW AURELLE <Icon name="arrow" size={15} /></a>
            <span className="story-flourish">A</span>
          </div>
        </section>

        <section className="newsletter-section">
          <p className="eyebrow">A NOTE FROM AURELLE</p>
          <h2>A little love <em>in your inbox.</em></h2>
          <p>First looks, thoughtful stories and 10% off your first order.</p>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              setNotice("You’re on the list. Look out for a little note from us.");
              event.currentTarget.reset();
              window.setTimeout(() => setNotice(""), 3000);
            }}
          >
            <input aria-label="Email address" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe"><Icon name="arrow" size={19} /></button>
          </form>
          <span className="newsletter-footnote">JUST THE GOOD THINGS. ALWAYS.</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#">
              <span className="brand-mark">A</span>
              <span className="brand-name">AURELLE</span>
              <span className="brand-subtitle">PAKISTANI WOMENSWEAR</span>
            </a>
            <p>Made with intention.<br />Worn with feeling.</p>
            <a className="social-link" href="https://www.instagram.com/" aria-label="Instagram">
              <Icon name="instagram" size={18} />
            </a>
          </div>
          <div className="footer-column">
            <h3>THE COLLECTION</h3>
            <a href="#collection">New arrivals</a>
            <a href="#collection">Ready to wear</a>
            <a href="#collection">Unstitched</a>
            <a href="#collection">Festive edit</a>
          </div>
          <div className="footer-column">
            <h3>HERE TO HELP</h3>
            <a href="#collection">Shipping & delivery</a>
            <a href="#collection">Returns & exchanges</a>
            <a href="#collection">Size guide</a>
            <a href="#collection">Get in touch</a>
          </div>
          <div className="footer-contact">
            <h3>A LITTLE NOTE</h3>
            <p>Have a question? We’re just a message away.</p>
            <a href="mailto:hello@aurelle.pk">hello@aurelle.pk <Icon name="arrow" size={15} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AURELLE. MADE WITH CARE IN PAKISTAN.</span>
          <span>PRIVACY &nbsp; · &nbsp; TERMS &nbsp; · &nbsp; PAYMENT OPTIONS</span>
        </div>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">YOUR LITTLE EDIT</p>
                <h2>Your bag <span>({cartCount})</span></h2>
              </div>
              <button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            {cart.length ? (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-copy">
                        <h3>{item.name}</h3>
                        <p>{item.color}</p>
                        <div className="quantity-control">
                          <button
                            aria-label={`Remove one ${item.name}`}
                            onClick={() =>
                              setCart((items) =>
                                items
                                  .map((entry) =>
                                    entry.id === item.id
                                      ? { ...entry, quantity: entry.quantity - 1 }
                                      : entry,
                                  )
                                  .filter((entry) => entry.quantity > 0),
                              )
                            }
                          >−</button>
                          <span>{item.quantity}</span>
                          <button
                            aria-label={`Add one ${item.name}`}
                            onClick={() => addToCart(item)}
                          >+</button>
                        </div>
                      </div>
                      <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <p><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></p>
                  <small>Shipping and any applicable taxes are calculated at checkout.</small>
                  <button
                    className="button checkout-button"
                    onClick={() => setNotice("Checkout is coming soon. Your bag is saved here.")}
                  >
                    CONTINUE TO CHECKOUT <Icon name="arrow" size={16} />
                  </button>
                  <button className="continue-shopping" onClick={() => setCartOpen(false)}>
                    Continue exploring
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-bag">
                <span className="empty-bag-icon"><Icon name="bag" size={30} /></span>
                <h3>It’s a little quiet in here.</h3>
                <p>Your next favourite is waiting to be found.</p>
                <button className="button" onClick={() => setCartOpen(false)}>EXPLORE THE COLLECTION</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export default App;
