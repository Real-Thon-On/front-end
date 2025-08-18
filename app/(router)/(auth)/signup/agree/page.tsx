export default function SignupAgree() {
  return (
    <>
      <div className="flex flex-col items-center">
        <section
          className="mb-[4rem]"
          style={{ marginTop: 'clamp(3rem, calc(3rem + 0.6 * (100svh - 690px)), 11rem)' }}
        >
          <h4 className="text-2xl font-bold">회원가입 약관 동의</h4>
        </section>
        <section
          style={{
            marginTop: 'clamp(6rem, calc(6rem + 0.7 * (100svh - 844px)), 8.5rem)',
            marginBottom: '3rem',
          }}
        >
          <p>서비스 이용을 위해 약관에 동의해주세요.</p>
          {/* Add your terms and conditions here */}
        </section>
      </div>
    </>
  );
}
