document.getElementById('imageLivre').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const img = document.getElementById('preview');
        img.src = e.target.result;
        img.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

if (file.size > 2 * 1024 * 1024) {
    alert('Image trop volumineuse (max 2 Mo)');
    this.value = '';
}
