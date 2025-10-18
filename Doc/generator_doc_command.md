# Laravel Generator dengan Inertia Support

## Fitur Baru

Command ini sekarang mendukung generate komponen Inertia.js dengan React dan Vue, termasuk:
- Controller khusus Inertia
- Komponen React (Index, Create, Edit, Show, _Form)
- Komponen Vue (Index, Create, Edit, Show, _Form)
- Form component yang reusable untuk Create dan Edit

## Instalasi

1. Copy file `GenerateAllCommand.php` ke `app/Console/Commands/`

2. Buat folder untuk stubs di `resources/stubs/` dan tambahkan file-file berikut:
   - `InertiaController.stub`
   - `Inertia.React.Index.stub`
   - `Inertia.React.Create.stub`
   - `Inertia.React.Edit.stub`
   - `Inertia.React.Show.stub`
   - `Inertia.React._Form.stub`
   - `Inertia.Vue.Index.stub`
   - `Inertia.Vue.Create.stub`
   - `Inertia.Vue.Edit.stub`
   - `Inertia.Vue.Show.stub`
   - `Inertia.Vue._Form.stub`

3. Pastikan stub yang sudah ada juga tersedia:
   - `Repository.stub`
   - `RepositoryInterface.stub`
   - `Service.stub`

## Cara Penggunaan

### Generate dengan Inertia React

```bash
php artisan make:all Product --model --migration --controller --repository --service --request --inertia-react
```

Akan menghasilkan:
```
app/Models/Product.php
app/Http/Controllers/ProductController.php (Inertia version)
app/Repositories/ProductRepository.php
app/Repositories/Contracts/ProductRepositoryInterface.php
app/Services/ProductService.php
app/Http/Requests/ProductRequest.php
resources/js/Pages/Product/Index.jsx
resources/js/Pages/Product/Create.jsx
resources/js/Pages/Product/Edit.jsx
resources/js/Pages/Product/Show.jsx
resources/js/Pages/Product/_Form.jsx
database/migrations/xxxx_create_products_table.php
```

### Generate dengan Inertia Vue

```bash
php artisan make:all Product --model --migration --controller --repository --service --request --inertia-vue
```

Akan menghasilkan komponen Vue (.vue files) di lokasi yang sama.

### Generate dengan Subfolder

```bash
php artisan make:all Admin/Product --model --controller --repository --service --inertia-react
```

Akan menghasilkan struktur:
```
app/Models/Admin/Product.php
app/Http/Controllers/Admin/ProductController.php
app/Repositories/Admin/ProductRepository.php
app/Repositories/Contracts/Admin/ProductRepositoryInterface.php
app/Services/Admin/ProductService.php
resources/js/Pages/Admin/Product/Index.jsx
resources/js/Pages/Admin/Product/Create.jsx
resources/js/Pages/Admin/Product/Edit.jsx
resources/js/Pages/Admin/Product/Show.jsx
resources/js/Pages/Admin/Product/_Form.jsx
```

### Generate Keduanya (React & Vue)

```bash
php artisan make:all Product --model --controller --repository --service --inertia-react --inertia-vue
```

Akan generate komponen untuk React (.jsx) dan Vue (.vue) sekaligus.

## Opsi Command

| Opsi | Deskripsi |
|------|-----------|
| `--model` | Generate Model |
| `--migration` | Generate Migration (dengan --model) |
| `--factory` | Generate Factory (dengan --model) |
| `--seed` | Generate Seeder (dengan --model) |
| `--controller` | Generate Controller |
| `--repository` | Generate Repository & Interface |
| `--service` | Generate Service |
| `--livewire` | Generate Livewire Component |
| `--request` | Generate Form Request |
| `--inertia-react` | Generate Inertia React Components |
| `--inertia-vue` | Generate Inertia Vue Components |

## Struktur Component

### _Form Component

File `_Form.jsx` atau `_Form.vue` adalah komponen reusable yang digunakan oleh Create dan Edit:

**React:**
```jsx
<Form onSubmit={handleSubmit} />  // untuk Create
<Form product={product} onSubmit={handleSubmit} />  // untuk Edit
```

**Vue:**
```vue
<Form @submit="handleSubmit" />  <!-- untuk Create -->
<Form :product="product" @submit="handleSubmit" />  <!-- untuk Edit -->
```

## Routes yang Perlu Ditambahkan

Setelah generate, tambahkan routes di `routes/web.php`:

```php
use App\Http\Controllers\ProductController;

Route::resource('products', ProductController::class);

// Atau dengan subfolder:
Route::resource('admin/products', Admin\ProductController::class);
```

## Binding Repository di Service Provider

Jangan lupa untuk bind repository interface di `app/Providers/AppServiceProvider.php`:

```php
public function register()
{
    $this->app->bind(
        \App\Repositories\Contracts\ProductRepositoryInterface::class,
        \App\Repositories\ProductRepository::class
    );
}
```

## Customisasi Form

Setelah generate, edit file `_Form.jsx` atau `_Form.vue` untuk menambahkan field sesuai kebutuhan:

**React:**
```jsx
const { data, setData, errors, processing } = useForm({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    // tambahkan field lain
});
```

**Vue:**
```vue
const form = useForm({
    name: props.product?.name || '',
    description: props.product?.description || '',
    price: props.product?.price || '',
    // tambahkan field lain
});
```

## Tips

1. **Clean Code**: Component `_Form` membuat code lebih clean karena logic form hanya ditulis sekali
2. **Validation**: Tambahkan rules di `ProductRequest.php`
3. **Authorization**: Implementasi policy untuk authorization
4. **Pagination**: Untuk Index, gunakan `paginate()` di Repository/Service
5. **Search & Filter**: Extend Repository method untuk search dan filter

## Contoh Lengkap

```bash
# Generate full CRUD dengan React
php artisan make:all Blog/Post \
  --model \
  --migration \
  --factory \
  --seed \
  --controller \
  --repository \
  --service \
  --request \
  --inertia-react

# Hasil:
# - Model: app/Models/Blog/Post.php
# - Migration: database/migrations/..._create_posts_table.php
# - Factory: database/factories/Blog/PostFactory.php
# - Seeder: database/seeders/Blog/PostSeeder.php
# - Controller: app/Http/Controllers/Blog/PostController.php
# - Repository: app/Repositories/Blog/PostRepository.php
# - Interface: app/Repositories/Contracts/Blog/PostRepositoryInterface.php
# - Service: app/Services/Blog/PostService.php
# - Request: app/Http/Requests/Blog/PostRequest.php
# - React Components: resources/js/Pages/Blog/Post/*.jsx
```