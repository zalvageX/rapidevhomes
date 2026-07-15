"use client"

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-black/70 text-white py-4 text-center">
      © {new Date().getFullYear()} Rapidev Global. All rights reserved.
    </footer>
  )
}

export default Footer
