# Haliç Üniversitesi - Yeni aday ana sayfası

Son tasarımın düzenlenebilir kaynakları ve doğrudan yüklenebilir yayın dosyaları.
Hazırlanma: 18 Kasım 2026. Kaynak: yayımlanmış 7. sürüm.

## Yayına alma

1. ZIP'i açın. `site/` klasörü sitenin tamamıdır: kaynak kod ve yayın dosyaları aynıdır.
2. `site/` **içindeki** `index.html`, `style.css`, `app.js`, `programs.json` ve
   `assets/` klasörünü hedef alan adının yayın dizinine yükleyin.
3. Sunucunun `/` adresinde yeni `index.html` dosyasını sunduğunu doğrulayın.
   HTTPS kullanın. `belgeler/` ve bu README'yi yayın köküne yüklemek gerekmez.

Derleme, npm kurulumu, Node sunucusu, veritabanı veya API anahtarı gerekmiyor.
Fontlar, animasyon kütüphanesi, görseller, Kedu ve video yerel dosyalardır.

**Mevcut aday.halic.edu.tr üzerinde:** WordPress'i ve alt sayfaları koruyun.
Yeni ana sayfa; program, ücret, burs, kampüs ve iletişim ayrıntıları için mevcut
resmî URL'lere bağlanır. `index.php`, `.htaccess`, `wp-content` ve form
altyapısını silmeyin. Ayrıntılı adımlar: `belgeler/YAYINA-ALMA.md`.

## Bilgisayarda önizleme

Paketin ana klasöründe:

```sh
python3 -m http.server 4173 --directory site
```

Tarayıcıda `http://localhost:4173` adresini açın; kapatmak için Ctrl+C kullanın.
HTML dosyasını çift tıklayarak açmak program verisinin yüklenmesini engelleyebilir.

## Dosyalar

- `site/index.html`: ana sayfa metinleri, bölümler ve bağlantılar.
- `site/style.css`: tasarım, font tanımları, mobil görünüm ve hareket kuralları.
- `site/app.js`: arama/filtreler, program penceresi, ücret seçimi, menü ve efektler.
- `site/programs.json`: 93 programın düzenlenebilir veri dosyası.
- `site/assets/`: 29 yerel görsel, font, video ve kütüphane dosyası.
- `belgeler/YAYINA-ALMA.md`: kurulum, mevcut WordPress'e geçiş ve yayın kontrolü.
- `belgeler/KAYNAKLAR.md` ve `gorsel-kaynaklar.json`: içerik ve medya kaynakları.
- `belgeler/LISANSLAR.md` ve `belgeler/lisanslar/`: varlık/lisans kayıtları.
- `belgeler/SURUM.json`: teslim edilen sürümün kaydı.
- `SHA256SUMS.txt`: dosya bütünlük özeti.

Tüm site dosyaları yayımlanmış sürümden byte düzeyinde aynen alınmıştır.
Paket için tasarım, içerik veya etkileşim değiştirilmemiştir.

## Geliştirilmiş kapsam

Bu teslim, kararlaştırılan **yeni ana sayfanın tüm kaynaklarını** içerir.
Alt sayfalar mevcut resmî sayfalarda kalır. Ücret bölümü resmî tabloya yönlendirir;
hesaplayıcı değildir. Danışmanlık telefon, WhatsApp ve resmî form bağlantılarıdır.
Yeni bir CRM/form sunucusu veya Kedu sohbet motoru geliştirilmemiştir.
Öğrenci mesajlarının görünür “örnek” etiketleri korunmuştur.

Verbatim font dosyası pakettedir; projede bu fontun web kullanım lisans belgesi
bulunmamaktadır. Yayın için mevcut lisansınızın bu alan adını kapsadığını
doğrulayın veya font sağlayıcısından uygun webfont lisansını tamamlayın.
Diğer lisans kayıtları `belgeler/LISANSLAR.md` içindedir.
