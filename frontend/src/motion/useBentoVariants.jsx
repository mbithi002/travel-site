const useBentoVariants = () => {
    const parentVar = {
        show: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
        hide: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
            },
        },
    };

    const childVar = {
        show: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                type: 'spring',
                stiffness: 100,
                when: 'beforeChildren',
                staggerChildren: 0.5
            },
        }),
        hide: {
            opacity: 0,
            y: 50,
            transition: {
                when: 'afterChildren',
            },
        },
    };

    const childVar2 = {
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
            }
        },
        hide: {
            opacity: 0,
            x: -100,
        }
    }

    return { parentVar, childVar, childVar2 };
};

export default useBentoVariants;
