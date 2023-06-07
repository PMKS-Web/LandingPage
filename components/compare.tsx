export default function Compare() {
    return (
        //Don't show if window is less than md
        <section className="hidden md:block">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-8">
                        <h2 className="h2 mb-4">Compare PMKS+ to other Linkage Analysis Tools</h2>
                        <p className="text-xl text-gray-400">
                            PMKS+ is a free, open-source, and easy to use tool for linkage analysis. It is available on all platforms and has powerful analysis tools.
                        </p>
                    </div>

                    {/* Comparison table */}
                    <table className="w-full border-collapse border-amber-700 text-left table-fixed">
                        <thead>
                        <tr className="align-bottom">
                            <th className="px-6 py-4"></th>
                            <th className="px-6 py-4 border-l">Free</th>
                            <th className="px-6 py-4">Available on all platforms</th>
                            <th className="px-6 py-4">Easy to learn</th>
                            <th className="px-6 py-4">Powerful analysis tools</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-purple-100">
                            <td className="px-6 py-4 rounded-l-md">
                                <img src="/images/PMKS_logo.png" alt="PMKS+" className="h-10" />
                            </td>
                            <td className="px-6 py-4 border-l">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4 rounded-r-md">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                        </tr>

                        <tr className="">
                            <td className="px-6 py-4">
                                MotionGen
                            </td>
                            <td className="px-6 py-4 border-l">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                        </tr>

                        <tr className="">
                            <td className="px-6 py-4">
                                SAM
                            </td>
                            <td className="px-6 py-4 border-l">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                        </tr>


                        <tr className="">
                            <td className="px-6 py-4">
                                Working Model
                            </td>
                            <td className="px-6 py-4 border-l">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                        </tr>

                        <tr className="">
                            <td className="px-6 py-4">
                                Solidworks
                            </td>
                            <td className="px-6 py-4 border-l">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                    <path d="M249-193.434 193.434-249l231-231-231-231L249-766.566l231 231 231-231L766.566-711l-231 231 231 231L711-193.434l-231-231-231 231Z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4">
                                <svg className="w-6 h-6 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
