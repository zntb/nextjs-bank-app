'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Send,
  Settings,
  Shield,
  User,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function Navbar({ isLoggedIn = false }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Navigation items for main menu
  const mainNavItems = [
    {
      title: 'Personal',
      href: '/personal',
      description: 'Banking solutions for individuals and families',
      children: [
        {
          title: 'Checking Accounts',
          href: '/personal/checking',
          description: 'Everyday banking with no monthly fees',
          icon: CreditCard,
        },
        {
          title: 'Savings Accounts',
          href: '/personal/savings',
          description: 'Grow your money with competitive rates',
          icon: DollarSign,
        },
        {
          title: 'Credit Cards',
          href: '/personal/credit-cards',
          description: 'Rewards and benefits for your lifestyle',
          icon: CreditCard,
        },
        {
          title: 'Loans & Mortgages',
          href: '/personal/loans',
          description: 'Financing solutions for your needs',
          icon: Home,
        },
      ],
    },
    {
      title: 'Business',
      href: '/business',
      description: 'Financial solutions for businesses of all sizes',
      children: [
        {
          title: 'Business Checking',
          href: '/business/checking',
          description: 'Efficient cash management for your business',
          icon: CreditCard,
        },
        {
          title: 'Business Loans',
          href: '/business/loans',
          description: 'Capital to grow your business',
          icon: DollarSign,
        },
        {
          title: 'Merchant Services',
          href: '/business/merchant',
          description: 'Payment processing solutions',
          icon: CreditCard,
        },
        {
          title: 'Treasury Management',
          href: '/business/treasury',
          description: 'Optimize your cash flow',
          icon: PieChart,
        },
      ],
    },
    {
      title: 'Wealth',
      href: '/wealth',
      description: 'Investment and wealth management services',
      children: [
        {
          title: 'Investment Services',
          href: '/wealth/investments',
          description: 'Build and manage your portfolio',
          icon: PieChart,
        },
        {
          title: 'Retirement Planning',
          href: '/wealth/retirement',
          description: 'Secure your financial future',
          icon: FileText,
        },
        {
          title: 'Estate Planning',
          href: '/wealth/estate',
          description: 'Preserve and transfer your wealth',
          icon: Shield,
        },
        {
          title: 'Private Banking',
          href: '/wealth/private',
          description: 'Personalized financial services',
          icon: User,
        },
      ],
    },
    {
      title: 'Resources',
      href: '/resources',
      children: [
        {
          title: 'Financial Education',
          href: '/resources/education',
          description: 'Learn about personal finance',
          icon: FileText,
        },
        {
          title: 'Security Center',
          href: '/resources/security',
          description: 'Protect your financial information',
          icon: Shield,
        },
        {
          title: 'Help Center',
          href: '/resources/help',
          description: 'Find answers to your questions',
          icon: HelpCircle,
        },
        {
          title: 'Locations',
          href: '/resources/locations',
          description: 'Find branches and ATMs near you',
          icon: Home,
        },
      ],
    },
  ];

  // Navigation items for authenticated users
  const dashboardNavItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Accounts', href: '/dashboard/accounts' },
    { icon: Send, label: 'Transfers', href: '/dashboard/transfers' },
    { icon: PieChart, label: 'Insights', href: '/dashboard/insights' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  // Notifications for the notification dropdown
  const notifications = [
    {
      id: 'n1',
      title: 'Payment Due',
      description: 'Your credit card payment is due in 3 days',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Security Alert',
      description: 'New login detected from Chicago, IL',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Transfer Complete',
      description: '$500 has been transferred to your Savings account',
      time: '2 days ago',
      unread: false,
    },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        {/* Logo and Mobile Menu */}
        <div className='flex items-center gap-2'>
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild className='lg:hidden'>
              <Button variant='ghost' size='icon'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-80 p-0'>
              <div className='flex h-16 items-center border-b px-4'>
                <Link
                  href='/'
                  className='flex items-center gap-2'
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <div className='h-8 w-8 rounded-full bg-primary'></div>
                  <span className='text-xl font-bold'>SecureBank</span>
                </Link>
                <Button
                  variant='ghost'
                  size='icon'
                  className='ml-auto'
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className='h-5 w-5' />
                  <span className='sr-only'>Close</span>
                </Button>
              </div>

              {/* Mobile Search */}
              <div className='p-4 border-b'>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search...'
                    className='w-full pl-8'
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className='px-4 py-2'>
                {isLoggedIn ? (
                  <>
                    <div className='flex items-center gap-3 py-3 border-b'>
                      <Avatar>
                        <AvatarImage
                          src='/placeholder.svg?height=32&width=32'
                          alt='User'
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium'>John Doe</p>
                        <p className='text-xs text-muted-foreground'>
                          john.doe@example.com
                        </p>
                      </div>
                    </div>
                    <nav className='grid gap-1 py-2'>
                      {dashboardNavItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                            pathname === item.href
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                          onClick={() => setIsMobileNavOpen(false)}
                        >
                          <item.icon className='h-4 w-4' />
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href='/logout'
                        className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground mt-2'
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        <LogOut className='h-4 w-4' />
                        Sign Out
                      </Link>
                    </nav>
                  </>
                ) : (
                  <>
                    <div className='grid gap-1 py-2'>
                      {mainNavItems.map((section, index) => (
                        <div key={index} className='py-2'>
                          <div className='flex items-center justify-between'>
                            <Link
                              href={section.href}
                              className='text-sm font-medium'
                              onClick={() => setIsMobileNavOpen(false)}
                            >
                              {section.title}
                            </Link>
                            <ChevronDown className='h-4 w-4 text-muted-foreground' />
                          </div>
                          <div className='mt-1 ml-2 grid gap-1 pl-2 border-l'>
                            {section.children?.map((item, childIndex) => (
                              <Link
                                key={childIndex}
                                href={item.href}
                                className='flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-foreground'
                                onClick={() => setIsMobileNavOpen(false)}
                              >
                                <item.icon className='h-4 w-4' />
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='grid gap-2 pt-4 border-t mt-2'>
                      <Link
                        href='/login'
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        <Button variant='outline' className='w-full'>
                          Log In
                        </Button>
                      </Link>
                      <Link
                        href='/register'
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        <Button className='w-full'>Sign Up</Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-full bg-primary'></div>
            <span className='text-xl font-bold'>SecureBank</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isLoggedIn ? (
          <NavigationMenu className='hidden lg:flex'>
            <NavigationMenuList>
              {mainNavItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                >
                                  <div className='flex items-center gap-2'>
                                    <child.icon className='h-4 w-4' />
                                    <div className='text-sm font-medium leading-none'>
                                      {child.title}
                                    </div>
                                  </div>
                                  <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                    {child.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <div className='hidden lg:flex items-center gap-6'>
            {dashboardNavItems.slice(0, 4).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className='h-4 w-4' />
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right Side - Search, Notifications, Profile */}
        <div className='flex items-center gap-4'>
          {/* Search Toggle */}
          <Button
            variant='ghost'
            size='icon'
            className='hidden md:flex'
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className='h-5 w-5' />
            <span className='sr-only'>Search</span>
          </Button>

          {/* Expanded Search */}
          {isSearchOpen && (
            <div className='absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
              <div className='container max-w-2xl'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    autoFocus
                    type='search'
                    placeholder='Search for accounts, transactions, help...'
                    className='w-full rounded-full border-primary pl-10 pr-12 py-6 text-lg'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-1/2 -translate-y-1/2'
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className='h-5 w-5' />
                    <span className='sr-only'>Close search</span>
                  </Button>
                </div>
                <div className='mt-4'>
                  <h3 className='text-sm font-medium mb-2'>Quick Links</h3>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    {[
                      'Transfer Money',
                      'Pay Bills',
                      'Account Statements',
                      'Support',
                    ].map((item, i) => (
                      <Button
                        key={i}
                        variant='outline'
                        size='sm'
                        className='justify-start'
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='relative'>
                    <Bell className='h-5 w-5' />
                    <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                      {notifications.filter(n => n.unread).length}
                    </span>
                    <span className='sr-only'>Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-80'>
                  <DropdownMenuLabel className='flex items-center justify-between'>
                    Notifications
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-auto p-0 text-xs font-normal'
                    >
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map(notification => (
                    <DropdownMenuItem
                      key={notification.id}
                      className='flex flex-col items-start p-4 cursor-pointer'
                    >
                      <div className='flex w-full justify-between'>
                        <span className='font-medium'>
                          {notification.title}
                        </span>
                        {notification.unread && (
                          <Badge
                            variant='outline'
                            className='ml-auto bg-primary/10 text-primary text-[10px] px-1.5 py-0 h-auto'
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <span className='text-sm text-muted-foreground mt-1'>
                        {notification.description}
                      </span>
                      <span className='text-xs text-muted-foreground mt-2'>
                        {notification.time}
                      </span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='p-2 cursor-pointer justify-center text-primary'>
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='rounded-full'>
                    <Avatar>
                      <AvatarImage
                        src='/placeholder.svg?height=32&width=32'
                        alt='User'
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <div className='flex items-center gap-2 p-2'>
                    <Avatar>
                      <AvatarImage
                        src='/placeholder.svg?height=32&width=32'
                        alt='User'
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>John Doe</p>
                      <p className='text-xs text-muted-foreground'>
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className='mr-2 h-4 w-4' />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className='mr-2 h-4 w-4' />
                      <span>Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className='flex items-center gap-2'>
              <Link href='/login'>
                <Button
                  variant='outline'
                  size='sm'
                  className='hidden md:inline-flex'
                >
                  Log In
                </Button>
              </Link>
              <Link href='/register'>
                <Button size='sm'>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Navigation for Logged In Users */}
      {isLoggedIn && (
        <div className='hidden lg:block border-t'>
          <div className='container flex h-10 items-center'>
            <nav className='flex items-center gap-4 text-sm'>
              <Link
                href='/dashboard/quick-pay'
                className='text-muted-foreground hover:text-foreground'
              >
                Quick Pay
              </Link>
              <Link
                href='/dashboard/bill-pay'
                className='text-muted-foreground hover:text-foreground'
              >
                Bill Pay
              </Link>
              <Link
                href='/dashboard/statements'
                className='text-muted-foreground hover:text-foreground'
              >
                Statements
              </Link>
              <Link
                href='/dashboard/cards'
                className='text-muted-foreground hover:text-foreground'
              >
                Cards
              </Link>
              <Link
                href='/dashboard/support'
                className='text-muted-foreground hover:text-foreground'
              >
                Support
              </Link>
            </nav>
            <div className='ml-auto flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>
                Last login: Today, 10:45 AM
              </span>
              <Badge variant='outline' className='text-[10px]'>
                <Shield className='h-3 w-3 mr-1' />
                Secure
              </Badge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
