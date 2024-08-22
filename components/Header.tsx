import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="md:flex-1">
      <div className="flex gap-x-4">
      <Image 
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="hidden h-12 w-12 md:block"
        />
          <h1 className="hidden md:block text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-3xl md:tracking-tight">
        <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-300 lg:inline">
          CoDraft
        </span>
      </h1>
      </div>
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 h-12 w-12 md:hidden"
        />
      </Link>

      {children}
    </div>
  )
}

export default Header