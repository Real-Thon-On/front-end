import NewProduct from '../_components/newProduct';
import Recommend from '../_components/recommend';

export default function MarketPage() {
  return (
    <>
      <h3>오늘의 추천 상품이에요!</h3>
      <div className="caption text-[var(--gray2)] mt-[.8rem]">
        온심님의 취향을 고려해서 가져왔어요~
      </div>
      <div className="flex gap-[1.2rem] mt-[2rem] overflow-x-scroll scrollbar-hidden">
        <Recommend
          label="온;ON 시그니처 키링"
          description="이 키링은 저희 온마음이음팀이 직접 디자인해서 만들었고요 그래서 퀄리티도 좋고요 아무튼 그냥 좋으니까 사주세요"
          price={50000}
        />
        <Recommend
          label="온;ON 시그니처 키링"
          description="이 키링은 저희 온마음이음팀이 직접 디자인해서 만들었고요 그래서 퀄리티도 좋고요 아무튼 그냥 좋으니까 사주세요"
          price={50000}
        />
        <Recommend
          label="온;ON 시그니처 키링"
          description="이 키링은 저희 온마음이음팀이 직접 디자인해서 만들었고요 그래서 퀄리티도 좋고요 아무튼 그냥 좋으니까 사주세요"
          price={50000}
        />
      </div>
      <div className="my-[4rem]">
        <h3>이번에 나온 신상품들이에요!</h3>
        <div className="caption text-[var(--gray3)] mt-[.8rem]">좋은 물건으로 가져왔어요~</div>
        <div className="mt-[2rem]">
          <NewProduct
            label="온심이 인형 (20cm)"
            tags={['선물', '인테리어']}
            price={50000}
          />
          <NewProduct
            label="온심이 인형 (20cm)"
            tags={['선물', '인테리어']}
            price={50000}
          />
          <NewProduct
            label="온심이 인형 (20cm)"
            tags={['선물', '인테리어']}
            price={50000}
          />
          <NewProduct
            label="온심이 인형 (20cm)"
            tags={['선물', '인테리어']}
            price={50000}
          />
          <NewProduct
            label="온심이 인형 (20cm)"
            tags={['선물', '인테리어']}
            price={50000}
          />
        </div>
      </div>
    </>
  );
}
