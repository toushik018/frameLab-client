import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect( () => {
        document.title = `FrameLab | ${title}`
    }, [title])
};

export default useTitle;