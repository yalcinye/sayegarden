// Görseller Unsplash'ten çiçek fotoğraflarıdır (Unsplash Lisansı: ücretsiz ticari kullanım, atıf zorunlu değil).
// Her anahtar sabit bir fotoğrafa bağlıdır. Kendi görsellerine geçmek için bu tabloyu ya da img() fonksiyonunu değiştir.
const photos = {
  'hero': '1487530811176-3780de880c2d',
  'how': '1490750967868-88aa4486c946',
  'gift': '1523693916903-027d144a2b7d',
  'cat-kolay': '1600264195762-c10ff160b264',
  'cat-az-isik': '1605996370592-b6f7a81e382e',
  'cat-evcil-dostu': '1597848212624-a19eb35e2651',
  'cat-buyuk': '1528756514091-dee5ecaa3278',
  'cat-hediye': '1496062031456-07b8f162a322',
  'zeytin-yaprakli-fikus': '1554494583-c4e1649bfe71',
  'zeytin-yaprakli-fikus-2': '1586968295564-92fd7572718b',
  'zeytin-yaprakli-fikus-3': '1587316830148-c9b01df2da38',
  'pasa-kilici': '1559563362-c667ba5f5480',
  'pasa-kilici-2': '1530906622963-8a60586a49c7',
  'pasa-kilici-3': '1518621736915-f3b1c41bfd00',
  'zamia': '1511201173873-c327e63eb6c4',
  'zamia-2': '1589832331026-62c755f29214',
  'zamia-3': '1575178094668-132dc931ad35',
  'kalathea-orbifolia': '1610397648930-477b8c7f0943',
  'kalathea-orbifolia-2': '1599463740831-a5015ef7b65a',
  'kalathea-orbifolia-3': '1582862058398-c157c8424b54',
  'devetabani': '1470509037663-253afd7f0f51',
  'devetabani-2': '1598920710727-e6c74781538c',
  'devetabani-3': '1548291616-bfccc8db731d',
  'barbunya-pilea': '1523694576729-dc99e9c0f9b4',
  'barbunya-pilea-2': '1508808703020-ef18109db02f',
  'barbunya-pilea-3': '1561181286-d3fee7d55364',
  'altin-pothos': '1566146991394-b09a95e80d17',
  'altin-pothos-2': '1560717789-0ac7c58ac90a',
  'altin-pothos-3': '1592339078319-1f8cc9d67888',
  'cennet-kusu': '1505129013025-ecf8f0168373',
  'cennet-kusu-2': '1528907298109-e64971adc8e5',
  'cennet-kusu-3': '1533907650686-70576141c030',
  'boston-egrelti': '1445510491599-c391e8046a68',
  'boston-egrelti-2': '1611625105602-42ee06be977e',
  'boston-egrelti-3': '1499002238440-d264edd596ec',
  'kauçuk': '1561181226-e8a7edd504c6',
  'kauçuk-2': '1488928741225-2aaf732c96cc',
  'kauçuk-3': '1525898939552-346875c89d92',
  'orkide-beyaz': '1542407242725-7d7f3d865665',
  'orkide-beyaz-2': '1583846712268-a77d97b7fd68',
  'orkide-beyaz-3': '1516477266610-9e4c763da721',
  'peperomia-karpuz': '1563730031910-60f14687e33a',
  'peperomia-karpuz-2': '1560583035-6d14e41fac5f',
  'peperomia-karpuz-3': '1539622230226-3d4eb483b3f2',
}
export const img = (key, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${photos[key] ?? photos.hero}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

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
