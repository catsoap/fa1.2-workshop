import React from 'react';
import { ReactComponent as PictoGithub } from '../svg/Octicons-mark-github.svg';
import { REPO_URL } from '../config';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="g-Footer">
                    <p>
                        Logos:
                        <ul>
                            <li>
                                <a href="https://thenounproject.com/rose-alice-design/">
                                    Alice Design
                                </a>
                            </li>
                        </ul>
                    </p>
                    <a href={REPO_URL} target="new">
                        <PictoGithub width="30" height="30" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
