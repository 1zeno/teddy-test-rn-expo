export const maskPrice = (price: string | number) => {
    if(typeof price !== "string"){
        price = price.toString();
    }
    price = price.replace(/\D/g, ''); // Remove tudo que não é dígito
    price = price.replace(/^0+/, ''); // Remove zeros à esquerda
    price = price.padStart(3, '0'); // Garante pelo menos 3 dígitos (00,1 -> 0,01)
    price = price.replace(/(\d{2})$/, ',$1'); // Coloca a vírgula antes dos últimos 2 dígitos
    price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Coloca o ponto a cada 3 dígitos, para separar milhares
    return `R$ ${price}`;
}

export const removeMaskPrice = (price: string) => {
    return price.replace(/\D/g, "");
}