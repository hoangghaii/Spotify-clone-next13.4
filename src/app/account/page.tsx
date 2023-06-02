import AccountContent from '@/app/account/components/AccountContent';
import Header from '@/components/commons/Header';

export const revalidate = 0;

const AccountPage = () => {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold capitalize">
            account settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default AccountPage;
