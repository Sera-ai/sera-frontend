import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from 'react-router-dom';
import React from 'react';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();

    const decodeBreadcrumb = (breadcrumb) => {
        if (typeof breadcrumb === 'string') {
            return decodeURIComponent(breadcrumb).replace(/%7B/g, '{').replace(/%7D/g, '}');
        } else if (breadcrumb && breadcrumb.props && typeof breadcrumb.props.children === 'string') {
            return React.cloneElement(breadcrumb, {
                ...breadcrumb.props,
                children: decodeURIComponent(breadcrumb.props.children).replace(/%7B/g, '{').replace(/%7D/g, '}')
            });
        }
        return breadcrumb;
    };

    return (
        <div className="space-x-5 text-sm">
            {breadcrumbs.map(({ match, breadcrumb }, index) => (
                <React.Fragment key={match.pathname}>
                    {index > 0 && <span>/</span>} {/* Separator */}
                    <NavLink to={decodeURIComponent(match.pathname)} style={{ color: index !== breadcrumbs.length - 1 ? "#fff" : null }}>
                        {decodeBreadcrumb(breadcrumb)}
                    </NavLink>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
