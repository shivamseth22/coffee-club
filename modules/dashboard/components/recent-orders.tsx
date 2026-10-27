import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentOrders } from "../data";

const statusVariant = {
  Paid: "secondary",
  Pending: "outline",
  Refunded: "destructive",
} as const;

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent orders</CardTitle>
        <CardDescription>Latest 5 orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.item}</TableCell>
                <TableCell className="text-right tabular-nums">{o.total}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
