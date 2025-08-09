import LoadSpinner from '@/components/load-spinner';

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center text-9xl">
            <LoadSpinner />
        </div>
    );
}
