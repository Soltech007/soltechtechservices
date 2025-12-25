export const tinymceConfig = {
    height: 500,
    menubar: true,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
        'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | help',

    // Use classic mode instead of inline
    inline: false,

    // Disable sticky toolbar
    toolbar_sticky: false,

    // Use sliding toolbar mode
    toolbar_mode: 'sliding',

    // This is important for dropdowns
    ui_mode: 'split',

    branding: false,
    promotion: false,
};