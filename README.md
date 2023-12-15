# Needful Things

Bu proje bir e commerance projesidir. Ruhlar Dükkanı isimli kitaptan esinlenerek lanetli antika objeler satan bir website yaptım.

![Ekran görüntüsü 2023-12-15 183258](https://github.com/yumin0095/the-project/assets/112933979/02af7e7f-b869-45e9-95f6-b74532f4e71a)
![Ekran görüntüsü 2023-12-15 183323](https://github.com/yumin0095/the-project/assets/112933979/c1ceba1b-e5ce-4568-bfe5-09a18b05edc3)
![Ekran görüntüsü 2023-12-15 183401](https://github.com/yumin0095/the-project/assets/112933979/0fcb3143-4925-4282-bd47-070c4ad36e91)

## Demo

https://needful-thing-9ahiavcwj-yagmurs-projects-660516e3.vercel.app/

  
## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/yumin0095/the-project
```

Proje dizinine gidin

```bash
  cd needful-thing
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Sunucuyu çalıştırın

```bash
  npm run dev
```

  
## Kullanılan Teknolojiler

**İstemci:** React, Redux, TailwindCSS, React Router DOM, react-toastify


  ## API Kullanımı

Redux Toolkit koduyla belirli API endpointlerini kullanarak asenkron işlemler gerçekleştirdim.

### Endpointler

#### `fetchProducts`

- Açıklama: Ürünleri getirmek için kullanılır.
- Kullanım: `dispatch(fetchProducts())`
- Yanıt: Ürün listesi

#### `addToCartAsync`

- Açıklama: Sepete ürün eklemek için kullanılır.
- Kullanım: `dispatch(addToCartAsync(selectedProduct))`
- Parametreler:
  - `selectedProduct`: Eklenecek ürün
- Yanıt: Eklendiği takdirde yeni eklenen ürün

#### `addToFavoritesAsync`

- Açıklama: Favorilere ürün eklemek için kullanılır.
- Kullanım: `dispatch(addToFavoritesAsync(selectedProduct))`
- Parametreler:
  - `selectedProduct`: Favorilere eklenecek ürün
- Yanıt: Eklendiği takdirde yeni eklenen ürün

### Fonksiyon Açıklamaları

- `fetchProducts`: Ürünleri almak için API endpointini çağırır.
- `addToCartAsync`: Sepete ürün eklemek için API endpointini çağırır.
- `addToFavoritesAsync`: Favorilere ürün eklemek için API endpointini çağırır.

### Örnek Kullanımlar

```javascript
// Ürünleri getirme örneği
dispatch(fetchProducts())
  .then((response) => {
    console.log('Alınan ürünler:', response);
  })
  .catch((error) => {
    console.error('Ürünleri alma başarısız oldu:', error);
  });

// Sepete ürün ekleme örneği
const selectedProduct = { /* ...ürün verisi... */ };
dispatch(addToCartAsync(selectedProduct))
  .then((response) => {
    if (response) {
      console.log('Sepete eklenen ürün:', response);
    } else {
      console.log('Bu ürün zaten sepette.');
    }
  })
  .catch((error) => {
    console.error('Sepete ürün ekleme başarısız oldu:', error);
  });

// Favorilere ürün ekleme örneği
const selectedProduct = { /* ...ürün verisi... */ };
dispatch(addToFavoritesAsync(selectedProduct))
  .then((response) => {
    if (response) {
      console.log('Favorilere eklenen ürün:', response);
    } else {
      console.log('Bu ürün zaten favorilerde.');
    }
  })
  .catch((error) => {
    console.error('Favorilere ürün ekleme başarısız oldu:', error);
  });
