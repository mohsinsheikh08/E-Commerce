import AppRoutes from './routes/AppRoutes'

const App = () => {
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  return (
    <div className='w-full h-screen'>
      <AppRoutes />
    </div>
  )
}

export default App