import ConverterForm from '@/components/queryparamjson/ConverterForm'; // Import the client component
import Footer from '@/components/Footer';
import Header from '@/components/Header';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header/>

      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Query Param ⇄ JSON Converter
        </h1>
       </div>
      <ConverterForm />


      <Footer/>
    </div>
  );
}
