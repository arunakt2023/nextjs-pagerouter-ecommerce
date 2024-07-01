import { GetServerSideProps } from 'next';
import { ProductServices } from '@/Services/Product-Services';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryProductsProps {
  categoryId: string;
  categoryName: string;
  filteredProducts: any[];
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryId, categoryName, filteredProducts }) => {
  console.log("category page", { categoryId, categoryName, filteredProducts });

  return (
    <>
      <div className="mt-4 mb-2 ps-5 fw-semibold fs-2 text-danger text-uppercase text-center">{categoryName}</div>
      <div className="d-flex flex-wrap justify-content-center gap-4 mb-5">
        {filteredProducts.map((fl) => (
          <Link href={`/Products/${fl.id}`} style={{ textDecoration: 'none' }} key={fl.id}>
            <div className="card mb-3" style={{ maxWidth: 540 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <Image src={fl.image.url} className="img-fluid rounded-start mt-3" alt={fl.name} width={540} height={540} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{fl.name}</h5>
                    <p className="card-text">{fl.description}</p>
                    <p className="card-text fw-bold">${fl.price.raw}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { CategoryId } = context.params!;
  const categoryName = await ProductServices.getCategory(CategoryId as string);
  const data = await ProductServices.getProducts();
  const filteredProducts = data.filter((d: any) => d.categories[0]?.slug === categoryName);

  return {
    props: {
      categoryId: CategoryId,
      categoryName,
      filteredProducts,
    },
  };
};

export default CategoryProducts;
