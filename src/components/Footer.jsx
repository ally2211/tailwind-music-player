export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div
      className="text-center p-8"
      style={{
        
        maxWidth: '100%', // Ensures it doesn't overflow on small screens
      }}
    >
      &copy; {year} Atlas School
    </div>
  );
}
