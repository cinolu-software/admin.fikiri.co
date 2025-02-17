import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "react-feather";
import { Breadcrumb, BreadcrumbItem, Col } from "reactstrap";

export const BreadCrumbs = () => {
  const pathname = usePathname();
  
  const symbolRegex = /[!@#\$%\^&\*\(\)_\+\{\}\[\]:;"'<>,.?/\\|`~\-=]/g;
  const [firstPart, secondPart, thirdPart] = pathname.split("/").slice(1).map((item) => item.replace(symbolRegex, " "));

  return (
    <Col xs="4" xl="4" className="page-title">
      <h4 className="f-w-700 text-capitalize">{thirdPart ? thirdPart : secondPart}</h4>
      <nav>
        <Breadcrumb className="justify-content-sm-start align-items-center">
          <BreadcrumbItem><Link href={`/sample_page`}><Home /></Link></BreadcrumbItem>
          <BreadcrumbItem className={`f-w-400 text-capitalize`}>{firstPart}</BreadcrumbItem>
          <BreadcrumbItem className={`f-w-400 ${!thirdPart ? "active" : ""}`}>{secondPart}</BreadcrumbItem>
          {thirdPart && <BreadcrumbItem className={`f-w-400 active`}>{thirdPart}</BreadcrumbItem>}
        </Breadcrumb>
      </nav>
    </Col>
  );
};
