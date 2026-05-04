const FileDropModal = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-[#fff4] flex items-center justify-center">
      <div className="ElevatedContainer rounded-xl w-1/2 h-1/2">{children}</div>
    </div>
  )
}

export default FileDropModal
