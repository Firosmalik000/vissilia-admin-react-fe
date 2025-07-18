import MainLayout from '@/fragment/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// --- Dummy Data untuk Gambar ---
const dummyImages = [
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Promosi Diskon Besar',
    caption: 'Diskon Akhir Tahun Hingga 50%!',
  },
  {
    src: 'https://images.unsplash.com/photo-1556740738-b6a63e67c914?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Produk Baru Eksklusif',
    caption: 'Jelajahi Koleksi Terbaru Kami',
  },
  {
    src: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Gratis Ongkir Seluruh Indonesia',
    caption: 'Belanja Lebih Hemat dengan Gratis Ongkir!',
  },
  {
    src: 'https://images.unsplash.com/photo-1550745165-9ff02c59580b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Promo Spesial Member',
    caption: 'Dapatkan Poin Lebih Banyak Hari Ini!',
  },
  {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Aplikasi Mobile Baru',
    caption: 'Download Aplikasi Kami Sekarang!',
  },
];

// --- Komponen CarouselDemo yang Dipercantik ---
export function CarouselDemo() {
  return (
    <Carousel
      className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl" // Lebar lebih besar, shadow lebih kuat
      opts={{
        loop: true, // Membuat carousel berulang
      }}
    >
      <CarouselContent>
        {dummyImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-2 md:p-4">
              <Card className="rounded-lg overflow-hidden border-none">
                {' '}
                {/* Hilangkan border default card */}
                <CardContent className="flex flex-col items-center justify-center p-0 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg" // Ukuran gambar responsif
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 rounded-lg">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-shadow-md">{image.caption}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-10" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg z-10" />
    </Carousel>
  );
}
const offers = [
  {
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3711?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Produk Elektronik',
  },
  {
    image: 'https://images.unsplash.com/photo-1586020542900-84c4a4e153ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Furnitur Rumah',
  },
  {
    image: 'https://images.unsplash.com/photo-1550995696-da1b74706593?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Pakaian Fashion',
  },
];

const ProgramMarketing = () => {
  return (
    <MainLayout>
      <main className="p-6 md:p-8 lg:p-10 flex-1 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
          <CarouselDemo />
        </div>
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Input Slide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer">
                <img src={offer.image} alt={offer.alt} className="w-full h-40 object-cover rounded-md mb-4" />
                <div className="flex gap-2">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Hapus</button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default ProgramMarketing;
