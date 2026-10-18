// Görseller rastgele placeholder'dır (picsum.photos). Kendi fotoğraflarınla değiştir.
export const img = (seed, w = 800, h = 1000) => `https://picsum.photos/seed/filiz-${seed}/${w}/${h}`

export const potColors = [
  { id: 'kum', name: 'Kum', hex: '#E3D5BC' },
  { id: 'kil', name: 'Kil', hex: '#C2683F' },
  { id: 'gece', name: 'Gece', hex: '#2B2D2A' },
  { id: 'adacayi', name: 'Adaçayı', hex: '#9DAE94' },
]

export const categories = [
  { id: 'kolay', name: 'Bakımı Kolay' },
  { id: 'az-isik', name: 'Az Işık Sever' },
  { id: 'evcil-dostu', name: 'Evcil Hayvan Dostu' },
  { id: 'buyuk', name: 'Büyük Bitkiler' },
  { id: 'hediye', name: 'Hediyelik' },
]

export const products = [
  { id: 1, slug: 'zeytin-yaprakli-fikus', name: 'Zeytin Yapraklı Fikus', latin: 'Ficus lyrata', price: 1290, size: 'Orta', light: 'Parlak dolaylı', water: 'Haftada bir göz at', categories: ['buyuk'], rating: 4.7, reviews: 128, badge: 'Çok Satan', blurb: 'Geniş, parlak yapraklarıyla salonun odak noktası olur.' },
  { id: 2, slug: 'pasa-kilici', name: 'Paşa Kılıcı', latin: 'Dracaena trifasciata', price: 690, size: 'Küçük', light: 'Az ışık – parlak', water: 'İki haftada bir', categories: ['kolay', 'az-isik'], rating: 4.9, reviews: 342, badge: 'Yeni Başlayan', blurb: 'Neredeyse unutulmayı sever; yatak odası için ideal.' },
  { id: 3, slug: 'zamia', name: 'Zamia', latin: 'Zamioculcas zamiifolia', price: 790, size: 'Küçük', light: 'Az ışık', water: 'İki haftada bir', categories: ['kolay', 'az-isik', 'hediye'], rating: 4.8, reviews: 211, blurb: 'Kuzey cepheli odalarda bile parlak yeşil kalır.' },
  { id: 4, slug: 'kalathea-orbifolia', name: 'Kalathea Orbifolia', latin: 'Goeppertia orbifolia', price: 940, size: 'Orta', light: 'Orta dolaylı', water: 'Toprağı nemli tut', categories: ['evcil-dostu'], rating: 4.5, reviews: 87, blurb: 'Çizgili yuvarlak yaprakları akşam olunca kapanır.' },
  { id: 5, slug: 'devetabani', name: 'Devetabanı', latin: 'Monstera deliciosa', price: 1490, size: 'Büyük', light: 'Parlak dolaylı', water: 'Haftada bir göz at', categories: ['buyuk', 'kolay'], rating: 4.8, reviews: 264, badge: 'Çok Satan', blurb: 'Yırtık yaprakları her yeni sürgünle büyür.' },
  { id: 6, slug: 'barbunya-pilea', name: 'Para Çiçeği', latin: 'Pilea peperomioides', price: 490, size: 'Küçük', light: 'Parlak dolaylı', water: 'Haftada bir', categories: ['evcil-dostu', 'hediye'], rating: 4.6, reviews: 154, blurb: 'Para gibi yuvarlak yapraklar, kolayca yavru verir.' },
  { id: 7, slug: 'altin-pothos', name: 'Altın Sarmaşık', latin: 'Epipremnum aureum', price: 450, size: 'Küçük', light: 'Az ışık – orta', water: 'Haftada bir', categories: ['kolay', 'az-isik'], rating: 4.9, reviews: 403, blurb: 'Raftan sarkan, hızla uzayan en affedici bitki.' },
  { id: 8, slug: 'cennet-kusu', name: 'Cennet Kuşu', latin: 'Strelitzia nicolai', price: 1890, size: 'Büyük', light: 'Parlak, biraz direkt', water: 'Haftada bir', categories: ['buyuk'], rating: 4.6, reviews: 72, badge: 'Sınırlı', blurb: 'Tavana uzanan muz yapraklarıyla tropik bir köşe.' },
  { id: 9, slug: 'boston-egrelti', name: 'Boston Eğreltisi', latin: 'Nephrolepis exaltata', price: 590, size: 'Orta', light: 'Orta dolaylı', water: 'Toprağı nemli tut', categories: ['evcil-dostu'], rating: 4.4, reviews: 96, blurb: 'Banyonun nemini seven yumuşak, dolgun yapraklar.' },
  { id: 10, slug: 'kauçuk', name: 'Kauçuk', latin: 'Ficus elastica', price: 990, size: 'Orta', light: 'Parlak dolaylı', water: 'Haftada bir göz at', categories: ['kolay', 'buyuk'], rating: 4.7, reviews: 181, blurb: 'Koyu bordo, kalın yapraklı dayanıklı bir klasik.' },
  { id: 11, slug: 'orkide-beyaz', name: 'Beyaz Orkide', latin: 'Phalaenopsis', price: 840, size: 'Küçük', light: 'Parlak dolaylı', water: 'Haftada bir buz küpü', categories: ['hediye', 'evcil-dostu'], rating: 4.5, reviews: 233, badge: 'Hediye', blurb: 'Haftalarca açık kalan zarif çiçekler.' },
  { id: 12, slug: 'peperomia-karpuz', name: 'Karpuz Peperomia', latin: 'Peperomia argyreia', price: 420, size: 'Küçük', light: 'Orta dolaylı', water: 'Haftada bir', categories: ['evcil-dostu', 'kolay', 'hediye'], rating: 4.6, reviews: 119, blurb: 'Karpuz kabuğu desenli minik, sevimli yapraklar.' },
].map((p) => ({ ...p, image: img(p.slug), gallery: [img(p.slug), img(`${p.slug}-2`), img(`${p.slug}-3`)] }))

export const testimonials = [
  { name: 'Elif K.', city: 'İzmir', text: 'İlk defa bir bitkiyi üç aydır yaşatıyorum. Saksının su göstergesi sayesinde ne zaman dolduracağımı biliyorum.' },
  { name: 'Mert A.', city: 'Ankara', text: 'Paketleme çok özenliydi, bitki tek bir yaprak kaybetmeden geldi. Ofise ikinciyi de aldık.' },
  { name: 'Zeynep T.', city: 'İstanbul', text: 'Bakım hatırlatmaları gerçekten işe yarıyor. Hediye olarak gönderdim, annem bayıldı.' },
]

export const faqs = [
  { q: 'Kendi kendini sulayan saksı nasıl çalışır?', a: 'Saksının alt haznesine su doldurursun; fitil sistemi toprağın ihtiyacı kadar suyu yukarı çeker. Bitkinin türüne göre hazne 2–4 hafta yeter.' },
  { q: 'Bitkim kargoda zarar görürse ne olur?', a: 'Teslimattan sonraki 30 gün içinde bitkin solar ya da hasarlı gelirse fotoğrafını gönder, ücretsiz yenisini yollayalım.' },
  { q: 'Kargo ne kadar sürer?', a: 'Hafta içi saat 14:00’e kadar verilen siparişler aynı gün kargoya çıkar, çoğu şehre 1–3 iş gününde ulaşır.' },
  { q: 'Hangi bitkiler kedi ve köpekler için güvenli?', a: 'Ürünlerde “Evcil Hayvan Dostu” etiketi olanlar ASPCA listesine göre toksik değildir. Yine de bitkiyi kemirmelerine izin vermemeni öneririz.' },
  { q: 'Hediye notu ekleyebilir miyim?', a: 'Evet. Sepet sayfasında hediye notu alanına mesajını yaz; fiyat bilgisi içermeyen özel bir kartla gönderilir.' },
  { q: 'Saksı rengini sonradan değiştirebilir miyim?', a: 'Sipariş kargoya verilmeden önce destek ekibine yazarsan rengi ücretsiz değiştiririz.' },
]
