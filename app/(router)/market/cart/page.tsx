import CartProduct from '../_components/cartProduct';
import NewProduct from '../_components/newProduct';
import Recommend from '../_components/recommend';

export default function MarketPage() {
  return (
    <>
      <div className="flex items-center px-[3.2rem]">
        <h3>온심</h3>
        <span className="body1 ml-[.4rem] mt-[.2rem]">님이 담그신 상품</span>
      </div>
      <div className="my-[1.6rem] border-b border-[var(--gray2)]">
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
        <CartProduct
          label="온;ON 시그니처 키링"
          arriveDate="8월 20일 (수) 도착 예정"
          price={50000}
        />
      </div>
    </>
  );
}
