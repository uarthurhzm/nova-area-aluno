export default function BookCover({ cd_acv }: { cd_acv: number }) {
    return (
        <img
            src={`http://biblioteca.unilago.com.br/img/capa/?nome=${cd_acv}`}
            className="w-12 h-16 object-cover rounded"
        />
    )
}