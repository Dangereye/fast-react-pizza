export default function Button({ disabled, children }) {
  return (
    <Button
      disabled={disabled}
      className='inline-block px-4 py-3 font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'
    >
      {children}
    </Button>
  );
}
