import {
    Heart,
    ShoppingBag,
    UserRound,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

export const HeaderBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative z-50 w-full">
            <div className="flex h-[64px] items-center justify-between px-5 sm:px-7 lg:px-9">

                {/* =========================
            LOGO
        ========================== */}
                <div className="flex min-w-[120px] items-center">
                    <a
                        href="#home"
                        className="group flex flex-col items-center leading-none"
                    >
                        {/* Jewelry symbol */}
                        <div className="relative mb-[2px] flex h-[23px] items-center justify-center">
                            <span className="absolute left-[3px] top-[2px] h-[16px] w-[16px] rounded-full border-[1.5px] border-[#11151b]" />
                            <span className="absolute left-[12px] top-[2px] h-[16px] w-[16px] rounded-full border-[1.5px] border-[#11151b]" />
                        </div>

                        <span className="font-serif text-[11px] font-semibold tracking-[-0.3px] text-[#11151b]">
                            JEWELRY
                        </span>
                    </a>
                </div>

                {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
                <nav className="hidden items-center rounded-full bg-white p-[4px] shadow-[0_1px_8px_rgba(0,0,0,0.05)] sm:flex">
                    <NavItem href="#home" active>
                        Home
                    </NavItem>

                    <NavItem href="#products">
                        Products
                    </NavItem>

                    <NavItem href="#about">
                        About
                    </NavItem>

                    <NavItem href="#contact">
                        Contact us
                    </NavItem>
                </nav>

                {/* =========================
            RIGHT ACTIONS
        ========================== */}
                <div className="flex min-w-[120px] items-center justify-end gap-2">

                    {/* Cart */}
                    <button
                        type="button"
                        aria-label="Shopping cart"
                        className="group relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white"
                    >
                        <ShoppingBag
                            size={17}
                            strokeWidth={1.6}
                            className="text-[#11151b] transition-transform group-hover:scale-105"
                        />

                        {/* Cart count */}
                        <span className="absolute right-[1px] top-[1px] flex h-[11px] min-w-[11px] items-center justify-center rounded-full bg-[#11151b] px-[2px] text-[7px] font-medium text-white">
                            1
                        </span>
                    </button>

                    {/* Wishlist */}
                    <button
                        type="button"
                        aria-label="Wishlist"
                        className="hidden h-9 w-9 items-center justify-center rounded-full transition hover:bg-white sm:flex"
                    >
                        <Heart
                            size={17}
                            strokeWidth={1.6}
                            className="text-[#11151b]"
                        />
                    </button>

                    {/* Profile */}
                    <button
                        type="button"
                        aria-label="Account"
                        className="hidden h-9 w-9 items-center justify-center rounded-full transition hover:bg-white sm:flex"
                    >
                        <UserRound
                            size={17}
                            strokeWidth={1.6}
                            className="text-[#11151b]"
                        />
                    </button>

                    {/* Mobile menu */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setMobileMenuOpen((value) => !value)}
                        className="flex h-9 w-9 items-center justify-center rounded-full sm:hidden"
                    >
                        {mobileMenuOpen ? (
                            <X size={19} strokeWidth={1.7} />
                        ) : (
                            <Menu size={19} strokeWidth={1.7} />
                        )}
                    </button>
                </div>
            </div>

            {/* =========================
          MOBILE MENU
      ========================== */}
            {mobileMenuOpen && (
                <div className="absolute left-4 right-4 top-[68px] rounded-2xl border border-[#e8e8e8] bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:hidden">
                    <MobileNavItem href="#home" onClick={() => setMobileMenuOpen(false)} active>
                        Home
                    </MobileNavItem>

                    <MobileNavItem href="#products" onClick={() => setMobileMenuOpen(false)}>
                        Products
                    </MobileNavItem>

                    <MobileNavItem href="#about" onClick={() => setMobileMenuOpen(false)}>
                        About
                    </MobileNavItem>

                    <MobileNavItem href="#contact" onClick={() => setMobileMenuOpen(false)}>
                        Contact us
                    </MobileNavItem>
                </div>
            )}
        </header>
    );
};

/* =================================
   DESKTOP NAV ITEM
================================= */

type NavItemProps = {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
};

const NavItem = ({
    href,
    children,
    active = false,
}: NavItemProps) => {
    return (
        <a
            href={href}
            className={[
                "rounded-full px-[13px] py-[6px]",
                "text-[10px] font-medium tracking-[-0.1px]",
                "transition-all duration-200",
                active
                    ? "bg-[#11151b] text-white"
                    : "text-[#11151b] hover:bg-[#f2f2f2]",
            ].join(" ")}
        >
            {children}
        </a>
    );
};

/* =================================
   MOBILE NAV ITEM
================================= */

type MobileNavItemProps = NavItemProps;

const MobileNavItem = ({
    href,
    children,
    active = false,
    onClick,
}: MobileNavItemProps) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={[
                "block rounded-xl px-4 py-3 text-sm font-medium",
                active
                    ? "bg-[#11151b] text-white"
                    : "text-[#11151b] hover:bg-[#f5f5f5]",
            ].join(" ")}
        >
            {children}
        </a>
    );
};