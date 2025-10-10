export const TopicTitle = ({ title }: { title: string }) => (
    <div className='space-y-2 mb-4'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>{title}</h2>
        <div className='w-full h-px bg-gray-200'></div>
    </div>
)